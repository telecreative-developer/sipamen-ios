import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { Text,
  Icon } from 'native-base'

const { width, height } = Dimensions.get('window')

const HorizontalMenu = (props) => {
  return (
    <View style={styles.card}>
      <Icon name={props.horizontalIcon} style={styles.icon}/>
      <Text style={styles.text}>{props.horizontalMenu}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#9f9f9f',
    width: width / 4.2,
    height: height / 18,
    marginLeft: 15
  },
  icon: {
    fontSize: 14,
    color: '#2f2f4f',
    marginRight: 7
  },
  text: {
    fontSize: 10,
    color: '#2f2f4f',
    marginLeft: 0,
  }
})

HorizontalMenu.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  key: PropTypes.string,
  items: PropTypes.node,
  horizontalIndicator: PropTypes.bool
}

HorizontalMenu.defaultProps = {
  horizontalIndicator: false
}

export default HorizontalMenu
