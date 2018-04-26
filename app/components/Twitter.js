import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Container, Content, Text } from 'native-base'
import PropTypes from 'prop-types'

const Twitter = (props) => (
  <Container style={styles.container}>
    <FlatList
      refreshing={props.refreshing}
      onRefresh={props.onRefresh}
      data={props.tweets}
      renderItem={props.renderTweets} />
  </Container>
)

Twitter.propTypes = {
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  tweets: PropTypes.array,
  renderTweets: PropTypes.func
}

const styles  = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  }
})

export default Twitter