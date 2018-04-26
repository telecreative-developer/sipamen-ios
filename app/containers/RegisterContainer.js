import React from 'react'
import {View, StyleSheet, Alert, BackHandler} from 'react-native'
import { Button, Text, Spinner } from 'native-base'
import Register from '../components/Register'
import { isEmail, isEmpty } from "validator"
import { connect } from 'react-redux'
import {setNavigate} from "../actions/processor"
import { register } from '../actions/register'

class RegisterContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      nrp: '',
      no_serdik: '',
      force_of: '',
      phone: '',
      password: '',
      confirmPassword: ''
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
    if(nextProps.success.condition === true && nextProps.success.process_on === 'SUCCESS_REGISTER') {
      Alert.alert(
        'Register Berhasil!',
        'Silahkan tunggu konfirmasi dari admin agar dapat melakukan process login.',
        [
          {text: 'OK', onPress: () => this.handleBack()},
        ],
        { cancelable: false }
      )
    }

    if(nextProps.failed.condition === true && nextProps.failed.process_on === 'FAILED_REGISTER') {
      Alert.alert(
        'Register Gagal!',
        nextProps.failed.message,
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      )
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
    await this.props.navigation.goBack()
    await this.props.setNavigate()
  }

  renderButtons() {
    const { first_name, last_name, email, nrp, no_serdik, force_of, phone, password, confirmPassword } = this.state
    const { loading } = this.props
    if (!isEmpty(first_name) &&
      !isEmpty(last_name) &&
      !isEmpty(email) &&
      nrp !== '' &&
      no_serdik !== '' &&
      force_of !== '' &&
      phone !== '' &&
      !isEmpty(password) &&
      !isEmpty(confirmPassword)) {
      return (
        <View style={styles.viewForm}>
          {loading.condition === true && loading.process_on === 'LOADING_REGISTER' ? (
            <Button block style={styles.buttonRegisterActive}>
              <Spinner color="#FFFFFF" />
            </Button>
            ) : (
            <Button block style={styles.buttonRegisterActive} onPress={() => this.handleValidationRegister()}>
              <Text style={styles.buttonRegisterActiveText}>DAFTAR</Text>
            </Button>
          )}
        </View>
      )
    } else {
      return (
        <View style={styles.viewForm}>
          <Button block style={styles.buttonRegisterInactive}>
            <Text style={styles.buttonRegisterInactiveText}>DAFTAR</Text>
          </Button>
        </View>
      )
    }
  }

  handleValidationRegister() {
    const { email, password, confirmPassword } = this.state
    if (!isEmail(email)) {
      Alert.alert('Register gagal', 'Silahkan masukan alamat email yang valid')
    } else if (password !== confirmPassword) {
      Alert.alert('Register gagal', 'Kata sandi dan konfirmasi kata sandi tidak cocok')
    } else {
      this.props.register(this.state)
      this.setState({
        first_name: '',
        last_name: '',
        email: '',
        nrp: '',
        no_serdik: '',
        phone: '',
        password: '',
        confirmPassword: ''
      })
    }
  }

  render() {
    const { first_name, last_name, email, nrp, no_serdik, phone, password, confirmPassword, force_of } = this.state
    return (
      <Register
        handleBack={() => this.handleBack()}
        firstName={first_name}
        onChangeFirstName={(first_name) => this.setState({first_name})}
        lastName={last_name}
        onChangeLastName={(last_name) => this.setState({last_name})}
        email={email}
        onChangeEmail={(email) => this.setState({email})}
        nrp={nrp}
        onChangeNRP={(nrp) => this.setState({nrp})}
        noSerdik={no_serdik}
        onChangeNoSerdik={(no_serdik) => this.setState({no_serdik})}
        forceOf={force_of}
        onChangeforceOf={(force_of) => this.setState({force_of})}
        phone={phone}
        onChangePhone={(phone) => this.setState({phone})}
        password={password}
        onChangePassword={(password) => this.setState({password})}
        confirmPassword={confirmPassword}
        onChangeConfirmPassword={(confirmPassword) => this.setState({confirmPassword})}
        renderButtons={this.renderButtons()} />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  success: state.success,
  failed: state.failed
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  register: (data) => dispatch(register(data))
})

const styles = StyleSheet.create({
  buttonRegisterActive: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#106538",
    paddingHorizontal: "5%"
  },
  buttonRegisterActiveText: {
    fontSize: 12,
    fontWeight: "bold"
  },
  buttonRegisterInactive: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingHorizontal: "5%",
    borderColor: "#106538"
  },
  buttonRegisterInactiveText: {
    fontSize: 12,
    color: "#106538",
    fontWeight: "bold"
  },
  viewFormTop: {
    marginHorizontal: 30,
    marginTop: 20,
    justifyContent: 'center'
  },
  viewForm: {
    marginHorizontal: 30,
    marginTop: 10,
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
