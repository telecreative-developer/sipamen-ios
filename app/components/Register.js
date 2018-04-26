import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {
  Container,
  Button,
  Text,
  Item,
  Input,
  Header,
  Left,
  Icon,
  Right,
  Content,
  Body,
  Title,
  H2 } from 'native-base'
import ThemeContainer from '../particles/ThemeContainer'
import PropTypes from 'prop-types'

const Register = (props) => (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>
          Registrasi
        </Title>
      </Body>
      <Right />
    </Header>
    <Content>
      <View style={styles.viewFormTop}>
        <Item regular>
          <Input placeholder='Nama Depan' style={styles.textInput} value={props.firstName} onChangeText={props.onChangeFirstName} />
        </Item>
      </View>
      <View style={styles.viewFormTop}>
        <Item regular>
          <Input placeholder='Nama Belakang' style={styles.textInput} value={props.lastName} onChangeText={props.onChangeLastName} />
        </Item>
      </View>
      <View style={styles.viewForm}>
        <Item regular>
          <Input keyboardType='email-address' placeholder='Email' style={styles.textInput} value={props.email} onChangeText={props.onChangeEmail} />
        </Item>
      </View>
      <View style={styles.viewForm}>
        <Item regular>
          <Input keyboardType='numeric' placeholder='NRP' style={styles.textInput} value={props.nrp} onChangeText={props.onChangeNRP} />
        </Item>
      </View>
      <View style={styles.viewForm}>
        <Item regular>
          <Input keyboardType='numeric' placeholder='No Serdik' style={styles.textInput} value={props.noSerdik} onChangeText={props.onChangeNoSerdik} />
        </Item>
      </View>
      <View style={styles.viewForm}>
        <Item regular>
          <Input keyboardType='numeric' placeholder='Angkatan' style={styles.textInput} value={props.forceOf} onChangeText={props.onChangeforceOf} />
        </Item>
      </View>
      <View style={styles.viewForm}>
        <Item regular>
          <Input keyboardType='numeric' placeholder='No Handphone' style={styles.textInput} value={props.phone} onChangeText={props.onChangePhone} />
        </Item>
      </View>
      <View style={styles.viewForm}>
        <Item regular>
          <Input secureTextEntry placeholder='Kata Sandi' style={styles.textInput} value={props.password} onChangeText={props.onChangePassword} />
        </Item>
      </View>
      <View style={styles.viewForm}>
        <Item regular>
          <Input secureTextEntry placeholder='Ulangi Kata Sandi' style={styles.textInput} value={props.name} onChangeText={props.onChangeConfirmPassword} />
        </Item>
      </View>
      {props.renderButtons}
      <TouchableOpacity style={styles.backToLogin} onPress={props.handleBack}>
        <Text note style={styles.backToLoginText}>Sudah punya akun? Masuk</Text>
      </TouchableOpacity>
    </Content>
  </Container>
)

Register.propTypes = {
  handleBack: PropTypes.func,
  firstName: PropTypes.string,
  onChangeFirstName: PropTypes.func,
  lastName: PropTypes.string,
  onChangeLastName: PropTypes.func,
  email: PropTypes.string,
  onChangeEmail: PropTypes.func,
  nrp: PropTypes.number,
  onChangeNRP: PropTypes.func,
  noSerdik: PropTypes.number,
  onChangeNoSerdik: PropTypes.func,
  forceOf: PropTypes.number,
  onChangeforceOf: PropTypes.func,
  phone: PropTypes.number,
  onChangePhone: PropTypes.func,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  confirmPassword: PropTypes.string,
  onChangeConfirmPassword: PropTypes.func,
  renderButtons: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  textInput: {
    fontSize: 12
  },
  backToLogin: {
    alignItems: 'center',
    margin: 30
  },
  backToLoginText: {
    color: '#212121'
  },
  viewFormTop: {
    marginHorizontal: 30,
    marginTop: 20,
    justifyContent: 'center'
  },
  viewForm: {
    marginHorizontal: 30,
    marginTop: 10,
    justifyContent: 'center'
  }
})

export default ThemeContainer(Register)