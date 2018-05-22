import React from 'react'
import { StyleProvider } from 'native-base'
import getTheme from '../native-base-theme/components'

const ThemeContainer = WrappedComponent =>
	class extends React.Component {
		render() {
			return (
				<StyleProvider style={getTheme()}>
					<WrappedComponent {...this.props} />
				</StyleProvider>
			)
		}
	}

export default ThemeContainer
