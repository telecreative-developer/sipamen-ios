import React from 'react'
import { StyleSheet, FlatList, View, Image } from 'react-native'
import { Container, Tabs, Tab, Content, Text } from 'native-base'
import PropTypes from 'prop-types'
import box from '../assets/images/box.png'

const Notification = (props) => (
  <Container style={styles.container}>
    <Content>
      <Tabs style={styles.tabs}>
        <Tab heading='Timeline'>
          {props.notifications.filter(notification => notification.type === 'comment').length !== 0 ? (
            <FlatList
              refreshing={props.loadingNotifications}
              onRefresh={props.onRefreshNotifications}
              data={props.notifications.filter(notification => notification.type === 'comment')}
              keyExtractor={(item, index) => JSON.stringify(index)}
              renderItem={props.renderTimelineNotifications} />
          ) : (
            <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
              <Image source={box} style={{width: 100, height: 100, opacity: 0.3}}/>
              <Text style={{fontWeight: 'bold', opacity: 0.3, fontSize: 16}}>Belum ada konten</Text>
            </View>
          )}
        </Tab>
        <Tab heading='Acara'>
          {props.generalNotificationEvents.length !== 0 ? (
            <FlatList
              refreshing={props.loadingNotifications}
              onRefresh={props.onRefreshNotifications}
              data={props.generalNotificationEvents}
              keyExtractor={(item, index) => JSON.stringify(index)}
              renderItem={props.renderEventNotifications} />
          ) : (
            <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
              <Image source={box} style={{width: 100, height: 100, opacity: 0.3}}/>
              <Text style={{fontWeight: 'bold', opacity: 0.3, fontSize: 16}}>Belum ada konten</Text>
            </View>
          )}
        </Tab>
        <Tab heading='Pengumuman'>
          {props.generalNotificationAnnouncements.length !== 0 ? (
            <FlatList
              refreshing={props.loadingNotifications}
              onRefresh={props.onRefreshNotifications}
              data={props.generalNotificationAnnouncements}
              keyExtractor={(item, index) => JSON.stringify(index)}
              renderItem={props.renderAnnouncementNotifications} />
          ) : (
            <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
              <Image source={box} style={{width: 100, height: 100, opacity: 0.3}}/>
              <Text style={{fontWeight: 'bold', opacity: 0.3, fontSize: 16}}>Belum ada konten</Text>
            </View>
          )}
        </Tab>
      </Tabs>
    </Content>
  </Container>
)

Notification.propTypes = {
  loadingNotifications: PropTypes.bool,
  onRefreshNotifications: PropTypes.func,
  notifications: PropTypes.array,
  generalNotificationEvents: PropTypes.array,
  generalNotificationAnnouncements: PropTypes.array,
  renderTimelineNotifications: PropTypes.element,
  renderEventNotifications: PropTypes.element,
  renderAnnouncementNotifications: PropTypes.element
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
})

export default Notification
