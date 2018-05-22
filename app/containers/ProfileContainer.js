import React from 'react'
import Profile from '../components/Profile'
import { connect } from 'react-redux'
import moment from 'moment'
import OneSignal from 'react-native-onesignal'
import { fetchMyPosts } from '../actions/posts'
import { setNavigate } from '../actions/processor'

class ProfileContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      refreshing: false
    }
  }

  async componentWillMount() {
    const { fetchMyPosts, sessionPersistance } = await this.props
    await this.setState({ refreshing: true })
    await fetchMyPosts(sessionPersistance.id, sessionPersistance.accessToken)
    await this.setState({ refreshing: false })
  }

  componentDidMount() {
    OneSignal.addEventListener('opened', this.onOpened)
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened)
  }

  onOpened = openResult => {
    if (openResult.notification.payload.additionalData.screen === 'announcement') {
      this.props.setNavigate('Announcement', openResult.notification.payload.additionalData.data)
    } else if (openResult.notification.payload.additionalData.screen === 'score') {
      this.props.setNavigate('ScoreList')
    }
  }

  handleNavigateToPost(item) {
    const { setNavigate } = this.props
    setNavigate('Post', item)
  }

  async handleRefresh() {
    const { fetchMyPosts, sessionPersistance } = await this.props
    await this.setState({ refreshing: true })
    await fetchMyPosts(sessionPersistance.id, sessionPersistance.accessToken)
    await this.setState({ refreshing: false })
  }

  render() {
    const { myPosts, sessionPersistance, scores } = this.props
    const { refreshing } = this.state
    return (
      <Profile
        posts={myPosts}
        refreshing={refreshing}
        handleRefresh={() => this.handleRefresh()}
        avatar={sessionPersistance.avatar_url}
        userName={`${sessionPersistance.first_name} ${sessionPersistance.last_name}`}
        forceOf={sessionPersistance.force_of}
        gender={sessionPersistance.gender}
        birthOfPlace={sessionPersistance.bop}
        birthOfDate={moment(sessionPersistance.bod).format('LL')}
        nrk={scores.nrk}
        nad={scores.nad}
      />
    )
  }
}

const mapStateToProps = state => ({
  myPosts: state.myPosts,
  scores: state.scores,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchMyPosts: (id, accessToken) => dispatch(fetchMyPosts(id, accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
