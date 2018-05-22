import React from 'react'
import { ToastAndroid, BackHandler, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import EditProfile from '../components/EditProfile'
import { updateProfile, updateProfileWithImage } from '../actions/users'
import { setNavigate } from '../actions/processor'

class EditProfileContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      visibleDatePicker: false,
      avatar: '',
      avatarBase64: '',
      firstName: '',
      lastName: '',
      gender: 1,
      bop: '',
      bod: '',
      forceOf: '',
      email: '',
      password: '',
      loading: false
    }
  }

  async componentDidMount() {
    const { avatar_url, first_name, last_name, gender, bop, bod, force_of } = await this.props.sessionPersistance
    const response = await AsyncStorage.getItem('session')
    const data = await JSON.parse(response)
    await this.setState({
      avatar: avatar_url,
      firstName: first_name,
      lastName: last_name,
      gender: gender,
      bop: bop,
      bod: bod,
      forceOf: JSON.stringify(force_of),
      email: data.email,
      password: data.password
    })

    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    this.props.setNavigate()
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
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

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !== this.props) {
      return true
    }

    if(nextState !== this.state) {
      return true
    }

    return false
  }

  getSnapshotBeforeUpdate(prevProps) {
    if(prevProps.success.condition && prevProps.success.process_on === 'SUCCESS_UPDATE_PROFILE') {
      return {
        success: true,
        message: 'Berhasil mengedit profil'
      }
    }else if(prevProps.failed.condition && prevProps.failed.process_on === 'FAILED_UPDATE_PROFILE') {
      return {
        success: false,
        message: 'Gagal mengedit profil'
      }
    }

    return null
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(snapshot !== null) {
      if(snapshot.success) {
        await ToastAndroid.show(snapshot.message, ToastAndroid.SHORT)
        await prevProps.navigation.goBack()
        await this.setState({loading: false})
      }else {
        await ToastAndroid.show(snapshot.message, ToastAndroid.SHORT)
        await this.setState({loading: false})
      }
    }
  }

  showDatePicker() {
    this.setState({visibleDatePicker: true})
  }

  closeDatePicker() {
    this.setState({visibleDatePicker: false})
  }

  handlePickDate(bod) {
    this.setState({visibleDatePicker: false, bod})
  }

  handleSaveProfile() {
    const { updateProfile, updateProfileWithImage, sessionPersistance } = this.props
    const { avatarBase64, firstName, lastName, gender, bop, bod, forceOf, email, password } = this.state
    
    if(avatarBase64 === '') {
      this.setState({loading: true})
      updateProfile(sessionPersistance.id, {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        bop: bop,
        bod: bod,
        force_of: forceOf,
        email: email
      }, password, sessionPersistance.accessToken)
    }else{
      this.setState({loading: true}) 
      updateProfileWithImage(sessionPersistance.id, avatarBase64, {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        bop: bop,
        bod: bod,
        force_of: forceOf,
        email: email
      }, password, sessionPersistance.accessToken)
    }
  }

  handlePickAvatar() {
    const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		}

		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel) {
				this.setState({avatarBase64: this.state.avatarBase64})
			} else {
				this.setState({
					avatar: response.uri,
					avatarBase64: `data:image/png;base64,${response.data}`
				})
			}
		})
  }

  render() {
    const { visibleDatePicker, avatar, firstName, lastName, gender, bop, bod, forceOf } = this.state
    const { loading } = this.props
    return (
      <EditProfile
        visibleDatePicker={visibleDatePicker}
        handlePickDate={date => this.handlePickDate(date)}
        handleCancelPickDate={() => this.closeDatePicker()}
        handleBack={() => this.props.navigation.goBack()}
        avatar={avatar}
        handlePickAvatar={() => this.handlePickAvatar()}
        onChangeFirstName={(firstName) => this.setState({firstName})}
        firstName={firstName}
        onChangeLastName={(lastName) => this.setState({lastName})}
        lastName={lastName}
        onChangeGender={(gender) => this.setState({gender})}
        gender={gender}
        onChangeBOP={(bop) => this.setState({bop})}
        bop={bop}
        onChangeBOD={() => this.showDatePicker()}
        bod={bod}
        onChangeForceOf={(forceOf) => this.setState({forceOf})}
        forceOf={forceOf}
        handleSaveProfile={() => this.handleSaveProfile()}
        loadingSaveProfile={this.state.loading} />
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
  updateProfile: (id, item, password, accessToken) => dispatch(updateProfile(id, item, password, accessToken)),
  updateProfileWithImage: (id, image, item, password, accessToken) => dispatch(updateProfileWithImage(id, image, item, password, accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)