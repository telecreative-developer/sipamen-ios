import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, BackHandler, StatusBar } from 'react-native'
import { Container, Header, Left, Icon, Right, Body, Text, Button, Spinner, Item, Input } from 'native-base'
import Mailer from 'react-native-mail'
import PropTypes from 'prop-types'
import ThemeContainer from '../particles/ThemeContainer'

const { height, width } = Dimensions.get('window')

const ReportBug = (props) => (
  <Container style={styles.container}>
    <StatusBar
      backgroundColor="#fff"
      barStyle="light-content"
    />
    <Header hasTabs style={styles.header}>
      <Left>
        <Icon name='md-arrow-back' style={styles.icon} onPress={props.handleBack} />
      </Left>
      <Body>
        <Text style={styles.headerText}>Laporan Masalah</Text>
      </Body>
      <Right />
    </Header>
    <View style={styles.containerView}>
      <Text style={styles.label}>Judul Masalah</Text>
      <Item regular style={styles.item}>
        <Input value={props.subject} onChangeText={props.onChangeSubject} placeholder='(contoh: Tidak Bisa Update Status)' style={styles.input} />
      </Item>
      <Text style={styles.label}>Detail Masalah</Text>
      <Item regular style={styles.item}>
        <Input value={props.description} onChangeText={props.onChangeDescription} multiline={true} placeholder='Deskripsikan masalah disini..' style={styles.inputDescription} />
      </Item>
      <Button full style={styles.button} onPress={props.handleSendReport}>
        <Text style={styles.text}>KIRIM</Text>
      </Button>
    </View>
  </Container>
)

ReportBug.propTypes = {
  handleBack: PropTypes.func,
  subject: PropTypes.string,
  onChangeSubject: PropTypes.func,
  description: PropTypes.string,
  onChangeDescription: PropTypes.func,
  handleSendReport: PropTypes.func
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#106538'
  },
  icon: {
    color: '#fff'
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16
  },
  flexHeaderSide: {
    flex: 1
  },
  flexHeader: {
    flex: 1,
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#fff'
  },
  containerView: {
    padding: 15
  },
  label: {
    fontSize: 12,
    color: '#000',
    marginBottom: 5,
    fontFamily: 'SourceSansPro-SemiBold'
  },
  input: {
    height: 40,
    fontSize: 12
  },
  inputDescription: {
    minHeight: 100,
    fontSize: 12,
    textAlignVertical: 'top'
  },
  item: {
    marginBottom: 20
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#106538',
    marginTop: 5,
    paddingHorizontal: '5%',
    borderColor: '#db4039'
  },
  text: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default ThemeContainer(ReportBug)
