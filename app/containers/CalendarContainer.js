import React from 'react'
import { Icon } from 'native-base'
import { View, Text, StyleSheet, BackHandler, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import Calendar from '../components/Calendar'
import { fetchEvents } from '../actions/events'

class CalendarContainer extends React.PureComponent {
  componentDidMount() {
    const { sessionPersistance, fetchEvents } = this.props
    fetchEvents(sessionPersistance.accessToken)
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    this.props.setNavigate("", "");
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    this.handleBack()
    return true
  }

  async handleBack() {
    await this.props.navigation.goBack()
    await this.props.setNavigate()
  }

  renderItem(item) {
    const { navigate } = this.props.navigation
    return (
      <TouchableHighlight onPress={() => navigate('Event', item)}>
        <View style={[styles.item, {height: item.height}]}>
          <View style={styles.viewContainer}>
            <Text style={styles.textTitle}>{item.title}</Text>
          </View>
          <Text>{item.description}</Text>
          <View style={styles.viewContainer}>
            <View style={styles.viewContainerWithIcon}>
              <Icon name='pin' style={styles.icon} />
              <Text style={styles.place}>{item.place}</Text>
            </View>
            <View style={styles.viewContainerWithIcon}>
              <Icon name='time' style={styles.icon} />
              <Text>{`${item.time_start} - ${item.time_end}`}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    )
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name
  }

  timeToString(time) {
    const date = new Date(time)
    return date.toISOString().split('T')[0]
  }

  render() {
    const { events } = this.props
    return (
      <Calendar
        handleBack={() => this.handleBack()}
        items={events}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)} />
    )
  }
}

const mapStateToProps = state => ({
  events: state.events,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  fetchEvents: (accessToken) => dispatch(fetchEvents(accessToken)),
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
  },
  viewContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitle: {
    fontWeight: 'bold'
  },
  icon: {
    fontSize: 15,
    color: '#999999',
    marginRight: 3
  },
  place: {
    marginRight: 10
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)