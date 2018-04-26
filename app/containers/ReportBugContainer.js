import React from 'react'
import { BackHandler } from 'react-native'
import Mailer from 'react-native-mail'
import ReportBug from '../components/ReportBug'
import { setNavigate } from '../actions/processor'
import { connect } from 'react-redux'
import { RECIPIENTS_MAIL_REPORT } from '../env'

class ReportBugContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      subject: '',
      description: ''
    }
  }

  componentDidMount() {
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
    const { navigation, setNavigate } = await this.props
    await setNavigate()
    await navigation.goBack()
  }

  handleSendReport() {
    const { subject, description } = this.state
    Mailer.mail({
      subject: subject,
      recipients: [RECIPIENTS_MAIL_REPORT],
      body: description,
      isHTML: true
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => {}},
          {text: 'Cancel', onPress: () => {}}
        ],
        { cancelable: true }
      )
    })
  }

  render() {
    const { subject, description } = this.state
    return (
      <ReportBug
        handleBack={() => this.handleBack()}
        subject={subject}
        description={description}
        onChangeSubject={subject => this.setState({subject})}
        onChangeDescription={description => this.setState({description})}
        handleSendReport={() => this.handleSendReport()} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(null, mapDispatchToProps)(ReportBugContainer)