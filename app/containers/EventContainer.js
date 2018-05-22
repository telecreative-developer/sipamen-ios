import React from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import Event from '../components/Event'
import { setNavigate } from '../actions/processor'

class EventContainer extends React.PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
  }

  backPressed = () => {
    this.handleBack()
    return true
  }

  async handleBack() {
    await this.props.navigation.goBack()
    await this.props.setNavigate()
  }

  render() {
    const { params } = this.props.navigation.state
    return (
      <Event
        handleBack={() => this.handleBack()}
        eventThumbnail={params.thumbnail_url}
        eventTitle={params.title}
        eventPlace={params.place}
        eventDate={params.date}
        eventTime={`${params.time_start} - ${params.time_end}`}
        eventDescription={params.description} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(null, mapDispatchToProps)(EventContainer)