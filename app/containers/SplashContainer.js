import React from 'react'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { login } from '../actions/login'
import Splash from '../components/Splash'
import { fetchBanners } from '../actions/banners'

class SplashContainer extends React.PureComponent {
	async componentDidMount() {
		await this.props.fetchBanners()
		const session = await AsyncStorage.getItem('session')
		const data = await JSON.parse(session)
		setTimeout(() => {
			if (data !== null) {
				try {
					this.props.login(data.email, data.password)
					this.props.navigation.dispatch(
						NavigationActions.reset({
							index: 0,
							actions: [NavigationActions.navigate({ routeName: 'ComponentPage' })]
						})
					)
				} catch (e) {
					this.props.navigation.dispatch(
						NavigationActions.reset({
							index: 0,
							actions: [NavigationActions.navigate({ routeName: 'ComponentPage' })]
						})
					)
				}
			} else {
				this.props.navigation.navigate('Login')
			}
		}, 2000)
	}

	render() {
		return <Splash />
	}
}

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password)),
	fetchBanners: () => dispatch(fetchBanners())
})

export default connect(null, mapDispatchToProps)(SplashContainer)
