import React from 'react'
import OneSignal from 'react-native-onesignal'
import { Alert, BackHandler, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Button, Spinner, Text } from 'native-base'
import { isEmpty, isEmail } from 'validator'
import { connect } from 'react-redux'
import Login from '../components/Login'
import { login } from '../actions/login'
import { setFailed } from '../actions/processor'

class LoginContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      onesignalId: '',
      email: '',
      password: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !== this.props) {
      return true
    }

    if(nextState !== this.state) {
      return true
    }

    return false
  }

  componentWillUpdate(nextProps) {
    const { loading, success, failed, navigation } = nextProps
    if (
      loading.condition === false &&
      loading.process_on === 'LOADING_PROCESS_LOGIN' &&
      failed.condition === true &&
      failed.process_on === 'FAILED_PROCESS_LOGIN'
    ) {
      Alert.alert('Login gagal', failed.message)
    } else if (
      loading.condition === false &&
      loading.process_on === 'LOADING_FETCH_USER_WITH_EMAIL' &&
      success.condition === true &&
      success.process_on === 'SUCCESS_FETCH_USER_WITH_EMAIL'
    ) {
      navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'ComponentPage'})]
        })
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { failed, setFailed } = prevProps
    if(failed.condition === true) {
      setFailed(false, 'FAILED_FETCH_USER_WITH_EMAIL', '')
    }
  }
  
  componentDidMount() {
    OneSignal.addEventListener('ids', this.onIds)
		BackHandler.addEventListener('hardwareBackPress', this.backPressed)
	}

	componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds)
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
  }

  onIds = (device) => {
    this.setState({onesignalId: device.userId})
  }

  backPressed = () => {
		return true
  }
  
  handleValidationLogin() {
    const { onesignalId, email, password } = this.state
		if (!isEmail(email)) {
			Alert.alert('Login gagal', 'Silahkan masukan alamat email yang valid')
		} else {
			this.props.login(email, password, onesignalId)
		}
  }

  renderButtons() {
    const { email, password } = this.state
    const { loading } = this.props
		if (!isEmpty(email) && !isEmpty(password)) {
			return (
				<Button full style={styles.buttonLoginActive} onPress={() => this.handleValidationLogin()}>
					{loading.condition === true && loading.process_on === 'LOADING_PROCESS_LOGIN' ? (
						<Spinner color="#FFFFFF" />
					) : (
						<Text style={styles.buttonLoginActiveText}>Masuk</Text>
					)}
				</Button>
			)
		} else {
			return (
				<Button full bordered style={styles.buttonLoginInactive}>
					<Text style={styles.buttonLoginInactiveText}>Masuk</Text>
				</Button>
			)
		}
  }
  
  render() {
    const { navigate } = this.props.navigation
    return (
      <Login
        valueEmail={this.state.email}
        valuePassword={this.state.password}
        onChangeEmail={(email) => this.setState({email})}
        onChangePassword={(password) => this.setState({password})}
        renderButtons={this.renderButtons()}
        navigateToRegister={() => navigate('Register')} />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  success: state.success,
  failed: state.failed
})

const mapDispatchToProps = dispatch => ({
  login: (email, password, onesignalId) => dispatch(login(email, password, onesignalId)),
  setFailed: (condition, process_on, message) => dispatch(setFailed(condition, process_on, message))
})

const styles = StyleSheet.create({
  buttonLoginActive: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#106538",
    marginTop: 20,
    paddingHorizontal: "5%"
  },
  buttonLoginActiveText: {
    fontSize: 12,
    fontWeight: "bold"
  },
  buttonLoginInactive: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginTop: 20,
    paddingHorizontal: "5%",
    borderColor: "#106538"
  },
  buttonLoginInactiveText: {
    fontSize: 12,
    color: "#106538",
    fontWeight: "bold"
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)