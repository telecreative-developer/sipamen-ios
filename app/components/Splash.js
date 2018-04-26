import React from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Container } from 'native-base'
import ThemeContainer from '../particles/ThemeContainer'
import logo from '../assets/images/logo.png'

const { width, height } = Dimensions.get('window')

const Splash = (props) => (
  <Container style={styles.splash}>
    <Image source={logo} style={{width: 300, height: 300}} />
  </Container>
)

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  }
})

export default ThemeContainer(Splash)
