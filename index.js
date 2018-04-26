import React from 'react'
import { AppRegistry } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import navigationDebouncer from 'react-navigation-redux-debouncer'
import Reactotron from 'reactotron-react-native'
import rootReducers from './app/reducers'
import AppNavigator from './AppNavigator'
import './ReactotronConfig'

const store = Reactotron.createStore(rootReducers, applyMiddleware(thunk, navigationDebouncer(600)))

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
)

AppRegistry.registerComponent('sipamen', () => App)
