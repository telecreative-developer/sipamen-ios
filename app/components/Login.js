import React from 'react'
import { StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native'
import { Container, Item, Input, Text, Form } from 'native-base'
import PropsTypes from 'prop-types'
import ThemeContainer from '../particles/ThemeContainer'
import image from '../assets/images/logo.png'

const { width } = Dimensions.get('window')

const Login = (props) => (
  <Container style={styles.container}>
    <Image source={image} style={styles.image} />
    <View style={styles.formLogin}>
      <Form>
        <Item regular style={styles.item}>
          <Input
            keyboardType='email-address'
            placeholder='Email Anda'
            style={styles.input}
            value={props.valueEmail}
            onChangeText={props.onChangeEmail} />
        </Item>
        <Item regular style={styles.item}>
          <Input
            secureTextEntry
            placeholder='Password'
            style={styles.input}
            value={props.valuePassword}
            onChangeText={props.onChangePassword} />
        </Item>
      </Form>
      {props.renderButtons}
      <TouchableOpacity onPress={props.navigateToRegister} style={{alignItems: 'center', margin: 20}}>
        <Text style={{fontSize: 12, color: '#212121'}}>Belum mempunyai akun? Daftar disini</Text>
      </TouchableOpacity>
    </View>
  </Container>
)

Login.propTypes = {
  valueEmail: PropsTypes.string,
  valuePassword: PropsTypes.string,
  onChangeEmail: PropsTypes.func,
  onChangePassword: PropsTypes.func,
  navigateToRegister: PropsTypes.func
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 12
  },
  formLogin: {
    width: width / 1.3,
    justifyContent: "center"
  },
  input: {
    height: 40,
    fontSize: 12
  },
  item: {
    marginTop: 10
  },
  icon: {
    fontSize: 16,
    marginRight: 0
  },
  register: {
    textAlign: "center",
    marginVertical: 25,
    fontSize: 12
  },
  registerNow: {
    color: "#00008b",
    fontSize: 12
  }
});

export default ThemeContainer(Login)
