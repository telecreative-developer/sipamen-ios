import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Animated,
  View,
  AsyncStorage
} from 'react-native'
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Icon,
  Button,
  Text,
  Left,
  Body,
  Right,
  Item,
  ListItem
} from 'native-base'
import { NavigationActions } from 'react-navigation'
import ThemeContainer from '../particles/ThemeContainer'
import Modal from 'react-native-modal'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import logo from '../assets/images/logo-header-01.png'

const { height, width } = Dimensions.get("window")

const ComponentPage = (props) => (
  <Container>
    <Modal
      isVisible={props.visibleModalHeader}
      style={styles.modal}
      animationIn='slideInDown'
      animationOut='slideOutUp'
      animationInTiming={300}
      animationOutTiming={400}
      onSwipe={props.closeModalHeader}
      swipeDirection='up'
      onBackdropPress={props.closeModalHeader}
      onBackButtonPress={props.closeModalHeader}>
      <View style={styles.wrapperMore}>
        <View style={styles.moreHeader}>
          <View style={styles.leftHeader} />
          <View style={styles.rightHeader}>
            <TouchableHighlight
              underlayColor='transparent'
              onPress={props.closeModalHeader}>
              <Text style={styles.postButton}>CLOSE</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View>
          <ListItem noBorder onPress={props.navigateEditProfile}>
            <Left style={styles.optionFlexSide} />
            <Body style={styles.optionFlex}>
              <Text style={styles.optionText}>Edit Profile</Text>
            </Body>
            <Right style={styles.optionFlexSide} />
          </ListItem>
          <ListItem
            noBorder
            onPress={props.navigateChangePassword}>
            <Left style={styles.optionFlexSide} />
            <Body style={styles.optionFlex}>
              <Text style={styles.optionText}>Ganti Password</Text>
            </Body>
            <Right style={styles.optionFlexSide} />
          </ListItem>
          <ListItem noBorder onPress={props.navigateReportBug}>
            <Left style={styles.optionFlexSide} />
            <Body style={styles.optionFlex}>
              <Text style={styles.optionText}>Laporan Masalah</Text>
            </Body>
            <Right style={styles.optionFlexSide} />
          </ListItem>
          <ListItem noBorder onPress={props.navigateLogout}>
            <Left style={styles.optionFlexSide} />
            <Body style={styles.optionFlex}>
              <Text style={styles.optionText}>Keluar</Text>
            </Body>
            <Right style={styles.optionFlexSide} />
          </ListItem>
        </View>
      </View>
    </Modal>
    {props.renderHeader}
    {props.renderContent}
    <Footer>
      <FooterTab style={styles.footer}>
        <Button
          vertical
          active={props.activePageFirst}
          onPress={props.handleActivePageFirst}>
          <Icon name='home' style={{color: props.activePageFirst ? '#106538' : '#999999', fontSize: props.activePageFirst ? 27 : 25}} />
          <Text uppercase={false} style={{color: props.activePageFirst ? '#106538' : '#999999', fontSize: props.activePageFirst ? 10 : 9}}>Home</Text>
        </Button>
        <Button
          vertical
          active={props.activePageSecond}
          onPress={props.handleActivePageSecond}>
          <EntypoIcon name='twitter' style={{color: props.activePageSecond ? '#106538' : '#999999', fontSize: props.activePageSecond ? 27 : 25}} />
          <Text uppercase={false} style={{color: props.activePageSecond ? '#106538' : '#999999', fontSize: props.activePageSecond ? 10 : 9}}>Tweet</Text>
        </Button>
        <Button
          vertical
          active={props.activePageThird}
          onPress={props.handleActivePageThird}>
          <Icon name='notifications' style={{color: props.activePageThird ? '#106538' : '#999999', fontSize: props.activePageThird ? 27 : 25}} />
          <Text uppercase={false} style={{color: props.activePageThird ? '#106538' : '#999999', fontSize: props.activePageThird ? 10 : 9}}>Notifications</Text>
        </Button>
        <Button
          vertical
          active={props.activePageFourth}
          onPress={props.handleActivePageFourth}>
          <Icon name='person' style={{color: props.activePageFourth ? '#106538' : '#999999', fontSize: props.activePageFourth ? 27 : 25}} />
          <Text uppercase={false} style={{color: props.activePageFourth ? '#106538' : '#999999', fontSize: props.activePageFourth ? 10 : 9}}>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
)

ComponentPage.propTypes = {
  renderHeader: PropTypes.element,
  renderContent: PropTypes.element,
  visibleModalHeader: PropTypes.bool,
  closeModalHeader: PropTypes.func,
  navigateEditProfile: PropTypes.func,
  navigateChangePassword: PropTypes.func,
  navigateReportBug: PropTypes.func,
  navigateLogout: PropTypes.func,
  handleActivePageFirst: PropTypes.func,
  activePageFirst: PropTypes.bool,
  handleActivePageSecond: PropTypes.func,
  activePageSecond: PropTypes.bool,
  handleActivePageThird: PropTypes.func,
  activePageThird: PropTypes.bool,
  handleActivePageFourth: PropTypes.func,
  activePageFourth: PropTypes.bool
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#ffffff"
  },
  header: {
    backgroundColor: "#106538"
  },
  headerStart: {
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 999
  },
  title: {
    fontWeight: "900"
  },
  logo: {
    width: 150,
    height: 150
  },
  icon: {
    color: "#fff"
  },
  wrapperMore: {
    width: "100%",
    height: "40%",
    backgroundColor: "#106538",
    margin: 0
  },
  modal: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    top: 0
  },
  moreHeader: {
    height: height / 13,
    borderBottomColor: "#064b26",
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row"
  },
  leftHeader: {
    flex: 0.8,
    flexDirection: "row"
  },
  rightHeader: {
    flex: 0.2
  },
  commentHeaderText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
    fontFamily: "SourceSansPro-SemiBold"
  },
  commentIcon: {
    fontSize: 18,
    color: "#fff"
  },
  postButton: {
    fontSize: 14,
    color: "#fff",
    textAlign: "right",
    fontWeight: "bold"
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "SourceSansPro-SemiBold",
    color: "#fff"
  },
  optionFlex: {
    flex: 1
  },
  optionFlexSide: {
    flex: 0.3
  }
})

export default ThemeContainer(ComponentPage)
