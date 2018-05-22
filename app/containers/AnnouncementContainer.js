import React from 'react'
import Announcement from '../components/Announcement'
import {BackHandler} from "react-native"
import {setNavigate} from "../actions/processor"
import { connect } from 'react-redux'

class AnnouncementContainer extends React.PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
  }

  backPressed = () => {
    this.handleBack()
    return true
  }

  async handleBack() {
    await this.props.navigation.goBack()
    await this.props.setNavigate()
  }

  render() {
    const { params } = this.props.navigation.state
    return (
      <Announcement
        handleBack={() => this.handleBack()}
        createdAt={params.createdAt}
        announcementContent={params.announcement} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(null, mapDispatchToProps)(AnnouncementContainer)
