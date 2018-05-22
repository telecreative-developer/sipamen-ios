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
import {View, Image} from 'react-native'
import box from '../assets/images/box.png'

const TitleScores = (props) => {
  return(
 
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
      {props.scoreMenu.length ? (
        <FlatList
          data={props.scoreMenu}
          keyExtractor={(item, index) => JSON.stringify(index)}
          renderItem={props.renderItems}
        />
      ):(
          <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
            <Image source={box} style={{width: 100, height: 100, opacity: 0.3}}/>
            <Text style={{fontWeight: 'bold', opacity: 0.3, fontSize: 16}}>Belum ada konten</Text>
          </View>
      )}
        
      </Content>
    </Container>
)}

TitleScores.propTypes = {
  title: PropTypes.string,
  handleBack: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  }
})

export default ThemeContainer(TitleScores)
