import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Button, Right,  Icon, Title } from 'native-base'
import ThemeContainer from '../particles/ThemeContainer'
import PropTypes from 'prop-types'
import { Agenda } from 'react-native-calendars'

const Calendar = (props) => (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button transparent>
          <Icon name='arrow-back' onPress={props.handleBack} />
        </Button>
      </Left>
      <Body>
        <Title>Kalender</Title>
      </Body>
      <Right />
    </Header>
    <Agenda
      items={props.items}
      displayLoadingIndicator={false}
      renderItem={props.renderItem}
      renderEmptyDate={props.renderEmptyDate}
      rowHasChanged={props.rowHasChanged}
      theme={{
        agendaDayTextColor: 'green',
        agendaDayNumColor: 'green',
        agendaTodayColor: 'green',
        agendaKnobColor: 'green'
      }} />
  </Container>
)

Calendar.propTypes = {
  handleBack: PropTypes.func,
  items: PropTypes.object,
  renderItem: PropTypes.func,
  renderEmptyDate: PropTypes.func,
  rowHasChanged: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  icon: {
    color: '#fff'
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16
  },
  flexHeaderSide: {
    flex: 1,
  },
  flexHeader: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    padding: 20
  },
  list: {
    flex: 1,
  },
})


export default ThemeContainer(Calendar)