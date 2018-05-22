import React from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import Post from '../components/Post'
import { fetchComments, sendComment } from '../actions/comments'
import { setNavigate } from '../actions/processor'

class PostContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      comment: ''
    }
  }
  
  async componentDidMount() {
    const { params } = await this.props.navigation.state
    await console.log('params', params)
    const { sessionPersistance, fetchComments } = await this.props
    await fetchComments(params.post_id, sessionPersistance.accessToken)
  }

  handleSendComment() {
    const { sendComment, sessionPersistance } = this.props
    const { params } = this.props.navigation.state
    const { comment } = this.state
    if(comment !== '') {
      sendComment(params.id,
        `${sessionPersistance.first_name} ${sessionPersistance.last_name}`, {
        comment: comment,
        post_id: params.post_id,
        id: sessionPersistance.id,
      }, sessionPersistance.accessToken)
      this.setState({comment: ''})
    }
  }

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
    const { comment } = this.state
    const { comments, sessionPersistance } = this.props
    const { params } = this.props.navigation.state
    return (
      <Post
        postAvatar={params.users[0].avatar_url}
        postName={`${params.users[0].first_name} ${params.users[0].last_name}`}
        postThumbnail={params.thumbnails}
        postContent={params.post}
        postDate={params.createdAt}
        avatar={sessionPersistance.avatar_url}
        handleTypeComment={(comment) => this.setState({comment})}
        handleBack={() => this.handleBack()}
        handleSendComment={() => this.handleSendComment()}
        commentText={comment}
        comments={comments} />
    )
  }
}

const mapStateToProps = state => ({
  sessionPersistance: state.sessionPersistance,
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchComments: (idPost, accessToken) => dispatch(fetchComments(idPost, accessToken)),
  sendComment: (userId, userName, data, accessToken) => dispatch(sendComment(userId, userName, data, accessToken)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)