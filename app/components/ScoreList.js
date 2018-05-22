import React from 'react'
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Text,
  Content,
  Right,
  Title,
  Container
} from 'native-base'
import ThemeContainer from '../particles/ThemeContainer'
import PropTypes from 'prop-types'

const ScoreList = props => (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{props.title}</Title>
      </Body>
      <Right />
    </Header>
    <Content>
      <FlatList
        data={props.scoreMenu}
        keyExtractor={(item, index) => JSON.stringify(index)}
        renderItem={props.renderItems}
      />
    </Content>
  </Container>
)

ScoreList.propTypes = {
  title: PropTypes.string,
  handleBack: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  }
})

export default ThemeContainer(ScoreList)
