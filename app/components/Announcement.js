import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Header, Left, Button, Icon, Body, Title, Subtitle, Content, Right, Text } from 'native-base'
import moment from 'moment'
import ThemeContainer from '../particles/ThemeContainer'
import { SAVE_SESSION_PERSISTANCE } from '../constants';

const Announcement = (props) => (
  <Container style={styles.container}>
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title style={styles.headerText}>Pengumuman</Title>
        <Subtitle style={styles.subtitle}>{moment(props.createdAt).format('LLL')}</Subtitle>
      </Body>
      <Right />
    </Header>
    <Content>
      <View style={styles.content}>
        <Text>
          {props.announcementContent}
        </Text>
      </View>
    </Content>
  </Container>
)

Announcement.propTypes = {
  announcementContent: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
  header:{
    backgroundColor: '#146639'
  },
  headerText:{
    color: '#fff'
  },
  content: {
    marginHorizontal: 15,
    marginVertical: 15
  },
  subtitle: {
    color: '#fff',
    fontSize: 12
  }
})

export default ThemeContainer(Announcement)