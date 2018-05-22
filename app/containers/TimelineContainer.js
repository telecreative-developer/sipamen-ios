import React from 'react'
import { BackHandler, Image, View } from 'react-native'
import { connect } from 'react-redux'
import Timeline from '../components/Timeline'
import TimelineCard from '../particles/TimelineCard'
import { setNavigate } from '../actions/processor'
import Carousel from 'react-native-banner-carousel'
import {fetchPosts} from "../actions/posts"

class TimelineContainer extends React.Component {
  constructor() {
    super()
    
    this.state = {
      post: '',
      imageBase64: '',
      refreshing: false,
      visibleModalCreatePost: false
    }
  }

  async componentWillMount() {
    const { fetchPosts, sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await fetchPosts(sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  componentDidMount() {
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
    const { navigation, setNavigate } = await this.props
    await setNavigate()
    await navigation.goBack()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !== this.props) {
      return true
    }

    if(nextState !== this.state) {
      return true
    }

    return false
  }

  handleNavigateToPost(item) {
    const { setNavigate } = this.props
    setNavigate('Post', item)
  }

  handleNavigateToCreatePost() {
    const { setNavigate } = this.props
    setNavigate('CreatePost')
  }

  async handleRefresh() {
    const { fetchPosts, sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await fetchPosts(sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }


  renderImages(data, index) {
    return (
      <View key={index}>
        <Image style={{height: 270}} source={{uri: data.thumbnail_url}} />
      </View>
    )
  }

  render() {
    const { posts } = this.props
    const { refreshing } = this.state
    return (
      <Timeline
        posts={posts}
        handleBack={() => this.handleBack()}
        refreshing={refreshing}
        handleRefresh={() => this.handleRefresh()}
        handleNavigateToCreatePost={() => this.handleNavigateToCreatePost()}
        renderPosts={({item}) => (
          <TimelineCard
            avatar={item.users[0].avatar_url}
            name={`${item.users[0].first_name} ${item.users[0].last_name}`}
            info={`SESPIMMEN ${item.users[0].force_of}`}
            image={item.image}
            post={item.post}
            createdAt={item.createdAt}
            handleNavigateToPost={() => this.handleNavigateToPost(item)}>
            {item.thumbnails.length !== 0 && (
              <Carousel
                showsPageIndicator={item.thumbnails.length > 1 ? true : false}
                autoplay={false}
                loop={false}
                index={0}>
                {item.thumbnails.map((image, index) => this.renderImages(image, index))}
              </Carousel>
            )}
          </TimelineCard>
        )}>
      </Timeline>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: (accessToken) => dispatch(fetchPosts(accessToken)),
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer)
