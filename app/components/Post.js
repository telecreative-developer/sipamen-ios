import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { Container, ListItem, Text, Title, Footer, Item, Subtitle, Header, Left, Button, Icon, Thumbnail, Input, Body, Right, Content } from 'native-base'
import moment from 'moment'
import Carousel from 'react-native-banner-carousel'
import defaultAvatar from '../assets/images/default-avatar.jpg'
import ThemeContainer from '../particles/ThemeContainer'

const { height } = Dimensions.get('window')

const renderImages = (data, index) => {
  return (
    <View key={index}>
      <Image style={{height: 270}} source={{uri: data.thumbnail_url}} />
    </View>
  )
}

const Post = (props) => (
  <Container style={styles.container}>
    <Header hasTabs style={styles.header}>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' style={styles.iconBack} />
          {props.postAvatar !== null ? (
            <Thumbnail small source={{uri: props.postAvatar}} />
          ) : (
            <Thumbnail small source={defaultAvatar} />
          )}
        </Button>
      </Left>
      <Body>
        <Title style={styles.title}>{props.postName}</Title>
        <Subtitle style={styles.subtitle}>{moment(props.postDate).format('LL')}</Subtitle>
      </Body>
      <Right />
    </Header>
    <Content>
      <View style={styles.contentPost}>
        <View style={styles.contentPostFluid}>
          <Text style={styles.post}>{props.postContent}</Text>
        </View>
        {props.postThumbnail && (
          <Carousel
            showsPageIndicator={props.postThumbnail.length > 1 ? true : false}
            autoplay={false}
            loop={false}
            index={0}>
            {props.postThumbnail.map((image, index) => renderImages(image, index))}
          </Carousel>
        )}
      </View>
      {props.comments.map((item, index) => (
        <ListItem avatar style={styles.listItem} key={index}>
          <Left>
            {item.users[0].avatar_url !== null ? (
              <Thumbnail small source={{uri: item.users[0].avatar_url}} />
            ) : (
              <Thumbnail small source={defaultAvatar} />
            )}
          </Left>
          <Body style={styles.commentBody}>
            <Text style={styles.commentName}>{item.users[0].first_name} {item.users[0].last_name}</Text>
            <Text note style={styles.commentText}>
              {item.comment}
            </Text>
            <Text note style={styles.time}>
              {moment(item.createdAt).startOf('day').fromNow()}
            </Text>
          </Body>
        </ListItem>
      )).reverse()}
    </Content>
    <Footer style={styles.footer}>
      <Left style={styles.left}>
      {props.avatar !== null ? (
        <Thumbnail small source={{uri: props.avatar}} />
      ) : (
        <Thumbnail small source={defaultAvatar} />
      )}
      </Left>
      <Body style={styles.body}>
        <Item regular>
          <Input autoFocus value={props.commentText} returnKeyType='send' placeholder='Komentar' style={styles.inputModal} onSubmitEditing={props.handleSendComment} onChangeText={props.handleTypeComment} />
        </Item>
      </Body>
    </Footer>
  </Container>
)

Post.propTypes = {
  postName: PropTypes.string,
  postAvatar: PropTypes.string,
  postDate: PropTypes.string,
  postContent: PropTypes.string,
  postThumbnail: PropTypes.array,
  comments: PropTypes.array,
  handleSendComment: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 0
  },
  listItem: {
    marginTop: 10,
    borderBottomWidth: 0,
    marginBottom: 10
  },
  title: {
    color: '#424242'
  },
  subtitle: {
    color: '#616161'
  },
  iconBack: {
    color: '#212121',
    marginRight: 10
  },
  thumbnail: {
    height: 200, 
    width: null, 
    flex: 1,
    marginBottom: 15
  },
  header: {
    backgroundColor: '#FFFFFF'
  },
  time: {
    fontSize: 10
  },
  post: {
    fontSize: 20,
    color: '#212121'
  },
  contentPost: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10
  },
  contentPostFluid: {
    margin: 15
  },
  commentBody: {
    backgroundColor: "#f5f6f7",
    marginRight: 15,
    paddingLeft: 10,
    borderRadius: 10,
    borderBottomWidth: 0
  },
  commentName: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold"
  },
  commentText: {
    color: "#000000",
    fontSize: 14
  },
  modal: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%"
  },
  commentContent: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 0
  },
  commentHeader: {
    height: height / 16,
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row"
  },
  commentHeaderText: {
    fontSize: 14,
    color: "#2f2f4f",
    marginLeft: 10,
    fontWeight: "bold"
  },
  flatlistView: {
    flex: 1
  },
  footer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderTopWidth: 0.3
  },
  body: {
    flex: 0.8,
    paddingLeft: 10
  },
  left: {
    flex: 0.1
  },
  right: {
    flex: 0.1
  },
  inputModal: {
    height: 35,
    fontSize: 14,
    padding: 0,
    backgroundColor: "#fff"
  }
})

export default ThemeContainer(Post)