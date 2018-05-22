import React, { Component } from 'react'
import { StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, Input, Item } from 'native-base'
import defaultAvatar from '../assets/images/default-avatar.jpg'

const { width, height } = Dimensions.get('window')

const TimelineCard = (props) => {
  return (
    <Card style={styles.card}>
      <CardItem style={styles.cardItemHeader}>
        <Left>
          {props.avatar !== null ? (
            <Thumbnail small source={{uri: props.avatar}} />
          ) : (
            <Thumbnail small source={defaultAvatar} />
          )}
          <Body>
            <Text style={styles.name}>{props.name}</Text>
            <Text note style={styles.info}>{props.info}</Text>
          </Body>
        </Left>
        <Right>
          <Text note style={styles.date}>{moment(props.createdAt).fromNow()}</Text>
        </Right>
      </CardItem>
      <CardItem cardBody>
        {props.children}
      </CardItem>
      <CardItem style={styles.cardItemCaption}>
        <Text style={styles.smallText}>{props.post}</Text>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <Button transparent style={styles.totalCommentButton} onPress={props.handleNavigateToPost}>
          <Text note style={styles.totalComment} uppercase={false}>View All Comments</Text>
        </Button>
      </CardItem>
      <CardItem style={styles.cardItemComment}>
        <Item regular onPress={props.handleNavigateToPost}>
          <Input disabled placeholder='Komentar' style={styles.input} />
        </Item>
      </CardItem>
    </Card>
  )
}

TimelineCard.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  info: PropTypes.string,
  createdAt: PropTypes.string,
  image: PropTypes.string,
  post: PropTypes.string,
  totalComment: PropTypes.func,
  handleNavigateToPost: PropTypes.func
}

const styles = StyleSheet.create({
  card: {
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation:0,
    borderColor: '#fff'
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 10
  },
  image: {
    height: 200, 
    width: null, 
    flex: 1
  },
  icon: {
    fontSize: 14,
    color: '#2f2f4f'
  },
  iconText: {
    fontSize: 11,
    paddingLeft: 7,
    color: '#2f2f4f'
  },
  smallText: {
    fontSize: 14
  },
  footerCard: {
    height: height / 16,
  },
  input: {
    height: 30,
    fontSize: 12,
    padding: 0,
  },
  cardItemHeader: {
    height: 53,
  },
  cardItem: {
    paddingTop: 0
  },
  cardItemCaption: {
    paddingTop: 10
  },
  cardItemComment: {
    paddingTop: 0,
    paddingBottom: 5
  },
  date: {
    fontSize: 12
  },
  totalCommentButton: {
    paddingTop: 0, 
    paddingLeft: 0, 
    paddingRight: 0, 
    paddingBottom: 0, 
    margin: 0, 
    height: 'auto', 
    width: 'auto'
  },
  totalComment: {
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 0
  }
})

export default TimelineCard