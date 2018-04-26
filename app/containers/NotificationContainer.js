import React from 'react'
import { StyleSheet } from 'react-native'
import Notification from '../components/Notification'
import { ListItem, Left, Thumbnail, Body, Text, Right } from 'native-base'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchNotifications, fetchGeneralNotifications } from '../actions/notifications'
import defaultAvatar from '../assets/images/default-avatar.jpg'
import { setNavigate } from '../actions/processor'

class NotificationContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      refreshing: false,
      items: {}
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  notificationText(type, content) {
    if(type === 'comment') {
      return <Text note>{`mengomentari kiriman anda: "${content}"`}</Text>
    }else if(type === 'event') {
      return <Text note>{`membuat kegiatan baru: "${content}"`}</Text>
    }else if(type === 'announcement') {
      return <Text note numberOfLines={2}>{`membuat pengumuman baru: "${content}"`}</Text>
    }
  }

  async handleRefresh() {
    const { fetchNotifications, fetchGeneralNotifications, sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await fetchNotifications(sessionPersistance.id, sessionPersistance.accessToken)
    await fetchGeneralNotifications(sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  render() {
    const { notifications, generalNotificationEvents, generalNotificationAnnouncements, setNavigate } = this.props
    return (
      <Notification
        loadingNotifications={this.state.refreshing}
        onRefreshNotifications={() => this.handleRefresh()}
        notifications={notifications}
        generalNotificationEvents={generalNotificationEvents}
        generalNotificationAnnouncements={generalNotificationAnnouncements}
        renderTimelineNotifications={({item}) => (
          <ListItem avatar style={styles.listNotification} onPress={() => setNavigate('Post', {...item.posts[0], users: item.users})}>
            <Left>
              {item.users ? (
                item.users[0].avatar_url ? (
                  <Thumbnail source={{uri: item.users[0].avatar_url}} />
                ) : (
                  <Thumbnail source={defaultAvatar} />
                )
              ) : (
                <Thumbnail source={defaultAvatar} />
              )}
            </Left>
            <Body>
              <Text note style={styles.name}>{`${item.users[0].first_name} ${item.users[0].last_name} `}</Text>
              {this.notificationText(item.type, item.content)}
            </Body>
            <Right>
              <Text note>{moment(item.createdAt).format('LT')}</Text>
            </Right>
          </ListItem>
        )}
        renderEventNotifications={({item}) => (
          <ListItem avatar style={styles.listNotification} onPress={() => setNavigate('Event', {...item.events[0]})}>
            <Left>
              <Thumbnail source={defaultAvatar} />
            </Left>
            <Body>
              <Text note style={styles.name}>Admin</Text>
              {this.notificationText(item.type, item.events[0].title)}
            </Body>
            <Right>
              <Text note>{moment(item.createdAt).format('LT')}</Text>
            </Right>
          </ListItem>
        )}
        renderAnnouncementNotifications={({item}) => (
          <ListItem avatar style={styles.listNotification} onPress={() => setNavigate('Announcement', {...item.announcements[0]})}>
            <Left>
              <Thumbnail source={defaultAvatar} />
            </Left>
            <Body>
              <Text note style={styles.name}>Admin</Text>
              {this.notificationText(item.type, item.announcements[0].announcement)}
            </Body>
            <Right>
              <Text note>{moment(item.createdAt).format('LT')}</Text>
            </Right>
          </ListItem>
        )} />
    )
  }
}

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    color: '#000000'
  },
  listNotification: {
    marginTop: 10
  }
})

const mapStateToProps = state => ({
  notifications: state.notifications,
  generalNotificationEvents: state.generalNotificationEvents,
  generalNotificationAnnouncements: state.generalNotificationAnnouncements,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchNotifications: (myid, accessToken) => dispatch(fetchNotifications(myid, accessToken)),
  fetchGeneralNotifications: (accessToken) => dispatch(fetchGeneralNotifications(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)