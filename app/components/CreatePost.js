import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Header, Spinner, Text, Button, Icon, Left, Input, Body, Title, Right, Content, ListItem, Thumbnail, Item, Footer, FooterTab } from 'native-base'
import PropTypes from 'prop-types'
import ThemeContainer from '../particles/ThemeContainer'
import defaultAvatar from '../assets/images/default-avatar.jpg'

const { height } = Dimensions.get('window')

const CreatePost = (props) => (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>Buat Status</Title>
      </Body>
      <Right>
        {props.loadingSendPost ? (
          <Button transparent>
            <Spinner color='#FFFFFF' />
          </Button>
        ) : (
          props.postEmpty ? (
            <Button transparent>
              <Icon name='send' style={{color: '#999999'}} />
            </Button>
          ) : (
            <Button transparent onPress={props.handleSendPost}>
              <Icon name='send' />
            </Button>
          )
        )}
      </Right>
    </Header>
    <Content>
      <ListItem avatar style={styles.listItemAvatar}>
        <Left>
          {props.avatar !== null ? (
            <Thumbnail small source={{uri: props.avatar}} />
          ) : (
            <Thumbnail small source={styles.image} source={defaultAvatar} />
          )}
          <Body>
            <Text style={styles.nameStatus}>
              {props.name}
            </Text>
            <Text note style={styles.info}>{`SESPIMMEN ${props.forceOf}`}</Text>
          </Body>
        </Left>
      </ListItem>
      <Item regular style={styles.itemStatus}>
        <Input
          placeholder='Apa yang anda pikirkan?'
          onChangeText={props.onChangePost}
          value={props.post}
          multiline={true}
          style={styles.inputStatus} />
      </Item>
      {props.children}
    </Content>
    <Footer>
      {props.countImages >= 5 ? (
        <FooterTab>
          <Button>
            <Icon name='images' size={35} style={{color: '#999999'}} />
            <Text style={{color: '#999999'}}>Image</Text>
          </Button>
          <Button>
            <Icon name='camera' size={35} style={{color: '#999999'}} />
            <Text style={{color: '#999999'}}>Camera</Text>
          </Button>
        </FooterTab>
      ) : (
        <FooterTab>
          <Button onPress={props.handlePickImage}>
            <Icon name='images' size={35} style={{color: '#2ecc71'}} />
            <Text>Image</Text>
          </Button>
          <Button onPress={props.handleOpenCamera}>
            <Icon name='camera' size={35} style={{color: '#2ecc71'}} />
            <Text>Camera</Text>
          </Button>
        </FooterTab>
      )}
    </Footer>
  </Container>
)

CreatePost.propTypes = {
  handleBack: PropTypes.func,
  name: PropTypes.string,
  avatar: PropTypes.string,
  forceOf: PropTypes.number,
  post: PropTypes.string,
  handlePickImage: PropTypes.func,
  handleOpenCamera: PropTypes.func,
  onChangePost: PropTypes.func,
  loadingSendPost: PropTypes.bool,
  handleSendPost: PropTypes.func,
  countImages: PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
  commentIcon: {
    fontSize: 16
  },
  inputStatus: {
    height: "auto",
    paddingLeft: 15
  },
  name: {
    fontSize: 16
  },
  paddingListItem: {
    paddingLeft: 7
  },
  commentContent: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 0
  },
  modal: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%"
  },
  itemStatus: {
    alignItems: "flex-start",
    borderColor: "transparent"
  },
  statusHeader: {
    height: height / 16,
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row"
  },
  leftHeader: {
    flex: 0.8,
    flexDirection: "row"
  },
  rightHeader: {
    flex: 0.2
  },
  postButton: {
    fontSize: 14,
    color: "#000080",
    marginRight: 5,
    textAlign: "right"
  },
  listItemAvatar: {
    marginVertical: 15
  },
})

export default ThemeContainer(CreatePost)