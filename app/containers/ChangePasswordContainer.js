import React from 'react'
import { ToastAndroid, Alert } from 'react-native'
import { connect } from 'react-redux'
import ChangePassword from '../components/ChangePassword'
import { setNavigate } from '../actions/processor'
import { changePassword } from '../actions/users';

class ChangePasswordContainer extends React.Component {
  constructor() {
    super()

    this.state = {
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

  componentWillUpdate(nextProps, nextState) {
    const { loading, success, failed } = nextProps
    if(loading.condition === false &&
      loading.process_on === 'LOADING_UPDATE_PASSWORD' &&
      success.condition === true &&
      success.process_on === 'SUCCESS_UPDATE_PASSWORD') {
      this.handleBack()
      ToastAndroid.show('Kata Sandi berhasil diubah', ToastAndroid.SHORT)
    }
  }

  async handleBack() {
    const { navigation, setNavigate } = await this.props
    await setNavigate()
    await navigation.goBack()
  }

  handleSavePassword() {
    const { password, confirmPassword } = this.state
    const { sessionPersistance, changePassword } = this.props
    if(password !== '' && confirmPassword !== '') {
      if(password !== confirmPassword) {
        Alert.alert('', 'Kata sandi dan Konfirmasi Kata Sandi Tidak Cocok')
      }else{
        changePassword(sessionPersistance.id, sessionPersistance.email, password, sessionPersistance.accessToken)
      }
    }
  }

  render() {
    const { password, confirmPassword } = this.state
    const { loading } = this.props
    return (
      <ChangePassword
        handleBack={() => this.handleBack()}
        password={password}
        onChangePassword={(password) => this.setState({password})}
        confirmPassword={confirmPassword}
        onChangeConfirmPassword={(confirmPassword) => this.setState({confirmPassword})}
        handleSavePassword={() => this.handleSavePassword()}
        loadingSavePassword={loading.condition === true && loading.process_on === 'LOADING_UPDATE_PASSWORD' ? true : false} />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  success: state.success,
  failed: state.failed,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  changePassword: (id, email, password, accessToken) => dispatch(changePassword(id, email, password, accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer)