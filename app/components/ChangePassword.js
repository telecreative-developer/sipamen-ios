import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native'
import {
  Container,
  Header,
  Left,
  Icon,
  Right,
  Body,
  Text,
  Button,
  Spinner,
  Item,
  Input,
  Title
} from 'native-base'
import PropTypes from 'prop-types'
import ThemeContainer from '../particles/ThemeContainer'

const { height, width } = Dimensions.get('window')

const ChangePassword = (props) => (
  <Container style={styles.container}>
    <Header style={styles.header}>
      <Left>
        <Icon name='md-arrow-back' style={styles.icon} onPress={props.handleBack} />
      </Left>
      <Body style={styles.flexHeader}>
        <Title style={styles.headerText}>Ganti Kata Sandi</Title>
      </Body>
      <Right />
    </Header>
    <View style={styles.containerView}>
      <Text style={styles.label}>Kata Sandi Baru</Text>
      <Item regular style={styles.item}>
        <Input value={props.password} onChangeText={props.onChangePassword} secureTextEntry={true} style={styles.input} />
      </Item>
      <Text style={styles.label}>Ulangi Kata Sandi</Text>
      <Item regular style={styles.item}>
        <Input value={props.confirmPassword} onChangeText={props.onChangeConfirmPassword} secureTextEntry={true} style={styles.input} />
      </Item>
      {props.loadingSavePassword ? (
        <Button full style={styles.button}>
          <Spinner color='#FFFFFF' />
        </Button>
      ) : (
        <Button full style={styles.button} onPress={props.handleSavePassword}>
          <Text style={styles.text}>GANTI KATA SANDI</Text>
        </Button>
      )}
    </View>
  </Container>
)

ChangePassword.propTypes = {
  handleBack: PropTypes.func,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  confirmPassword: PropTypes.string,
  onChangeConfirmPassword: PropTypes.func,
  handleSavePassword: PropTypes.func
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#106538"
  },
  headerText:{
    color: '#fff'
  },
  icon: {
    color: "#fff"
  },
  headerText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "SourceSansPro-SemiBold",
    fontSize: 16
  },
  flexHeaderSide: {
    flex: 1
  },
  flexHeader: {
    flex: 1,
    alignItems: "center"
  },
  container: {
    backgroundColor: "#fff"
  },
  containerView: {
    padding: 15
  },
  label: {
    fontSize: 12,
    color: "#000",
    marginBottom: 5,
    fontFamily: "SourceSansPro-SemiBold"
  },
  input: {
    height: 40,
    fontSize: 12
  },
  item: {
    marginBottom: 20
  },
  button: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#106538",
    marginTop: 5,
    paddingHorizontal: "5%",
    borderColor: "#db4039"
  },
  text: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold"
  }
});

export default ThemeContainer(ChangePassword)
