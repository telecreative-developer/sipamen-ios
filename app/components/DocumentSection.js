import React from 'react'
import { StyleSheet, FlatList, View, Image, Text, ActivityIndicator } from 'react-native'
import { Header, Left, Button, Icon, Body, Right, Title, Container } from 'native-base'
import ThemeContainer from '../particles/ThemeContainer'
import PropTypes from 'prop-types'
import box from '../assets/images/box.png'

const DocumentSection = (props) => (
  <Container style={styles.container}>
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title style={styles.headerText}>{props.documentTitle}</Title>
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
    {!!props.documentData.length ? (
      <FlatList
        data={props.documentData}
        keyExtractor={(item, index) => index}
        renderItem={props.renderDocuments} />
    ) : (
      <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
        <Image source={box} style={{width: 100, height: 100, opacity: 0.3}}/>
        <Text style={{fontWeight: 'bold', opacity: 0.3, fontSize: 16}}>Belum ada konten</Text>
      </View>
    )}
  </Container>
)

DocumentSection.propTypes = {
  refreshing: PropTypes.boolean,
  onRefresh: PropTypes.func,
  documentTitle: PropTypes.string,
  handleBack: PropTypes.func,
  documentData: PropTypes.array,
  renderDocuments: PropTypes.func
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#146639'
  },
  headerText:{
    color: '#fff'
  },
  container: {
    backgroundColor: '#FFFFFF'
  }
})

export default ThemeContainer(DocumentSection)