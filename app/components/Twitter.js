import React from 'react'
import { StyleSheet, View, FlatList, StatusBar } from 'react-native'
import { Container, Content, Text } from 'native-base'
import PropTypes from 'prop-types'

const Twitter = props => (
  <Container style={styles.container}>
    <StatusBar
      backgroundColor="#fff"
      barStyle="light-content"
    />
    <FlatList
      refreshing={props.refreshing}
      onRefresh={props.onRefresh}
      data={props.tweets}
      keyExtractor={(item, index) => JSON.stringify(index)}
      renderItem={props.renderTweets}
    />
  </Container>
)

Twitter.propTypes = {
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  tweets: PropTypes.array,
  renderTweets: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  }
})

export default Twitter
