import React from 'react'
import {BackHandler, ImageBackground, Dimensions, ToastAndroid} from 'react-native'
import { Icon, Body, Header, Button, Right } from 'native-base'
import CreatePost from '../components/CreatePost'
import { sendPost, sendPostWithImage } from '../actions/posts'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import ImagePicker from 'react-native-image-crop-picker'
import {addImage, cancelImage} from "../actions/images"
import Carousel from 'react-native-banner-carousel'

const { width } = Dimensions.get('window')

class CreatePostContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      post: ''
    }
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

  componentWillUpdate(nextProps) {
    const { success } = nextProps
    if (success.condition === true && success.process_on === 'SUCCESS_SEND_POST') {
      this.handleBack()
      ToastAndroid.show('Kegiatan berhasil diupdate', ToastAndroid.SHORT)
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

  handleSendPost() {
    const { sendPost, sendPostWithImage, sessionPersistance, dataImages } = this.props
    const { post } = this.state
    if(dataImages.length !== 0) {
      sendPostWithImage({
        post: post,
        id: sessionPersistance.id,
        dataImages: dataImages
      }, sessionPersistance.accessToken)
    }else{
      sendPost({
        post: post,
        id: sessionPersistance.id
      }, sessionPersistance.accessToken)
    }
  }

  handlePickImage() {
    const { addImage } = this.props
		ImagePicker.openPicker({
      width: width / 3,
      height: width / 3,
      multiple: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(data => {
      addImage(`data:${data[0].mime};base64,${data[0].data}`)
    })
  }

  handleOpenCamera() {
    const { addImage } = this.props
    ImagePicker.openCamera({
      width: width / 3,
      height: width / 3,
      multiple: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(data => {
      addImage(`data:${data[0].mime};base64,${data[0].data}`)
    })
  }

  renderImages(data, index) {
    const { cancelImage } = this.props
    return (
      <ImageBackground style={{height: 270}} source={{uri: data.image}} key={index}>
        <Header style={{backgroundColor: 'transparent'}} hasTabs>
          <Body />
          <Right>
            <Button transparent onPress={() => cancelImage(data)}>
              <Icon name='close' style={{color: '#FFFFFF'}} />
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    )
  }

  render() {
    const { sessionPersistance, loading, dataImages } = this.props
    const { post } = this.state
    return (
      <CreatePost
        handleBack={() => this.handleBack()}
        handlePickImage={() => this.handlePickImage()}
        handleOpenCamera={() => this.handleOpenCamera()}
        onChangePost={(post) => this.setState({post})}
        handleSendPost={() => this.handleSendPost()}
        postEmpty={post !== '' ? false : true}
        loadingSendPost={loading.condition === true && loading.process_on === 'LOADING_SEND_POST' ? true : false}
        name={`${sessionPersistance.first_name} ${sessionPersistance.last_name}`}
        avatar={sessionPersistance.avatar_url}
        forceOf={sessionPersistance.force_of}
        post={post}
        countImages={dataImages.length}>
        {dataImages.length !== 0 && (
          <Carousel
            showsPageIndicator={dataImages.length > 1 ? true : false}
            autoplay={false}
            loop={false}
            index={0}>
            {dataImages.map((image, index) => this.renderImages(image, index))}
          </Carousel>
        )}
      </CreatePost>
    )
  }
}

const mapStateToProps = state => ({
  sessionPersistance: state.sessionPersistance,
  loading: state.loading,
  success: state.success,
  dataImages: state.dataImages
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  addImage: (image) => dispatch(addImage(image)),
  cancelImage: (image) => dispatch(cancelImage(image)),
  sendPost: (data, accessToken) => dispatch(sendPost(data, accessToken)),
  sendPostWithImage: (data, accessToken) => dispatch(sendPostWithImage(data, accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostContainer)