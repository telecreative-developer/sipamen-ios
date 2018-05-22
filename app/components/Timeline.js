import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  FlatList,
} from 'react-native'
import {
  Container,
  Fab,
  Icon,
  Left,
  Body,
  Right,
  Header,
  Title,
  Text,
  Button
} from 'native-base'
import PropTypes from 'prop-types'
import box from '../assets/images/box.png'
import ThemeContainer from '../particles/ThemeContainer'

const Timeline = (props) => (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>Kegiatan</Title>
      </Body>
      <Right />
    </Header>
    {props.children}
    {props.posts.length !== 0 ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={props.refreshing}
        onRefresh={props.handleRefresh}
        data={props.posts}
        keyExtractor={(item, index) => JSON.stringify(index)}
        renderItem={props.renderPosts} />
    ) : (
      <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
        <Image source={box} style={{width: 100, height: 100, opacity: 0.3}}/>
        <Text style={{fontWeight: 'bold', opacity: 0.3, fontSize: 16}}>Belum ada kegiatan</Text>
      </View>
    )}
    <View>
      <Fab active style={styles.fab} position="bottomRight" onPress={props.handleNavigateToCreatePost}>
        <Icon name='create' />
      </Fab>
    </View>
  </Container>
)

Timeline.propTypes = {
  posts: PropTypes.array,
  refreshing: PropTypes.bool,
  renderPosts: PropTypes.func,
  handleRefresh: PropTypes.func,
  handleNavigateToCreatePost: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  fab: {
    flex: 1
  },
  input: {
    height: 30,
    fontSize: 12,
    padding: 0,
    backgroundColor: "#fff"
  },
  cardItemComment: {
    paddingTop: 0,
    paddingBottom: 5
  },
  thumbnailComment: {
    width: 30,
    height: 30
  },
  nameStatus: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold"
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
  modalFooter: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderTopWidth: 0.3
  },
  fab: {
    backgroundColor: "#106538"
  },
  inputStatus: {
    height: "auto",
    paddingLeft: 15
  },
  info: {
    fontSize: 10
  },
  paddingListItem: {
    paddingLeft: 7
  },
  leftAlign: {
    alignItems: "center"
  },
})

export default ThemeContainer(Timeline)
