import React from 'react'
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Header, Left, Button, Icon, Body, Right, Title, Container } from 'native-base'
import ThemeContainer from '../particles/ThemeContainer'
import PropTypes from 'prop-types'

const DocumentList = (props) => (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>{props.documentTitle}</Title>
      </Body>
      <Right>
        {props.refreshing ? (
          <Button transparent>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </Button>
        ) : (
          <Button transparent onPress={props.onRefresh}>
            <Icon name='refresh' />
          </Button>
        )}
      </Right>
    </Header>
    <FlatList
      data={props.documentData}
      keyExtractor={(item, index) => index}
      renderItem={props.renderDocuments} />
  </Container>
)

DocumentList.propTypes = {
  refreshing: PropTypes.boolean,
  onRefresh: PropTypes.func,
  documentTitle: PropTypes.string,
  handleBack: PropTypes.func,
  documentData: PropTypes.array,
  renderDocuments: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  }
})

export default ThemeContainer(DocumentList)