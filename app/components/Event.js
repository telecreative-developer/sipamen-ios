import React from 'react'
import { ImageBackground, Dimensions, View, Text, StyleSheet, StatusBar } from 'react-native'
import { Container, Content, Button, Header, Left, Body, Right, Icon, H1 } from 'native-base'
import moment from 'moment'
import PropTypes from 'prop-types'
import ThemeContainer from '../particles/ThemeContainer'
import defaultThumbnail from '../assets/images/default-thumbnail.png'

const { width, height } = Dimensions.get('window')

const Event = (props) => (
  <Container style={styles.container}>
    <Content>
      {props.eventThumbnail !== null ? (
        <ImageBackground source={{uri: props.eventThumbnail}} style={styles.eventThumbnail}>
          <Header hasTabs style={styles.header}>
            <Left>
              <Button transparent onPress={props.handleBack}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body />
          </Header>
        </ImageBackground>
      ) : (
        <ImageBackground source={defaultThumbnail} style={styles.eventThumbnail}>
          <Header hasTabs style={styles.header}>
            <Left>
              <Button transparent onPress={props.handleBack}>
                <Icon name='arrow-back' style={{color: '#212121'}} />
              </Button>
            </Left>
            <Body />
          </Header>
        </ImageBackground>
      )}
      <View style={styles.containerTitle}>
        <View style={styles.viewTitle}>
          <View style={styles.contentLeft}>
            <Text style={{color: '#106538'}}>{moment(props.eventDate).format('MMM').toUpperCase()}</Text>
            <H1>{moment(props.eventDate).format('DD').toUpperCase()}</H1>
          </View>
          <View style={styles.contentRight}>
            <H1>{props.eventTitle}</H1>
            <View style={styles.descWithIcon}>
              <Icon name='pin' style={styles.icon} />
              <Text>{props.eventPlace}</Text>
            </View>
            <View style={styles.descWithIcon}>
              <Icon name='calendar' style={styles.icon} />
              <Text>{moment(props.eventDate).format('LL')}</Text>
            </View>
            <View style={styles.descWithIcon}>
              <Icon name='time' style={styles.icon} />
              <Text>{props.eventTime}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerContent}>
        <Text style={styles.description}>{props.eventDescription}</Text>
      </View>
    </Content>
  </Container>
)

Event.propTypes = {
  handleBack: PropTypes.func,
  eventThumbnail: PropTypes.string,
  eventTitle: PropTypes.string,
  eventPlace: PropTypes.string,
  eventDate: PropTypes.string,
  eventTime: PropTypes.string,
  eventDescription: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  eventThumbnail: {
    height: height / 3
  },
  containerTitle: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1
  },
  header: {
    backgroundColor: 'transparent'
  },
  iconCalendar: {
    fontSize: 70
  },
  containerContent: {
    margin: 15
  },
  description: {
    fontSize: 15,
    lineHeight: 25
  },
  contentLeft: {
    marginLeft: 15,
    marginVertical: 15,
    alignItems: 'center'
  },
  contentRight: {
    margin: 15, width: '70%'
  },
  viewTitle: {
    flexDirection: 'row'
  },
  descWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3
  },
  icon: {
    fontSize: 15,
    color: '#999999',
    marginRight: 5
  }
})

export default ThemeContainer(Event)