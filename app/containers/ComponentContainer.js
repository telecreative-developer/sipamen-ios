import React from 'react'
import { AsyncStorage, Alert, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Header, Body, Right, Left, Icon } from 'native-base'
import { NavigationActions } from 'react-navigation'
import ComponentPage from '../components/ComponentPage'
import OneSignal from 'react-native-onesignal'
import { setNavigate, setActivePageHome } from '../actions/processor'
import HomeContainer from './HomeContainer'
import TwitterContainer from './TwitterContainer'
import NotificationContainer from './NotificationContainer'
import ProfileContainer from './ProfileContainer'
import logo from '../assets/images/logo-header-01.png'

class ComponentContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      visibleModalHeader: false
    }
  }

  componentDidMount() {
    OneSignal.inFocusDisplaying(2)
    OneSignal.enableSound(true)
    OneSignal.enableVibrate(true)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.prop) {
      return true
    }

    if (nextState !== this.state) {
      return true
    }

    return false
  }

  componentWillUpdate(nextProps) {
    const { navigate, navigation } = nextProps
    if (navigate.link === 'EditProfile') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'ChangePassword') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'ReportBug') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'Calendar') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'Post') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'Event') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'Announcement') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'CreatePost') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'DocumentViewer') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'DocumentList') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'DocumentSection') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'Timeline') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'POKUji') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'Srcore') {
      navigation.navigate(navigate.link, navigate.data)
    } else if (navigate.link === 'ScoreList') {
      navigation.navigate(navigate.link, navigate.data)
    }
  }

  handleCloseModalHeader() {
    this.setState({ visibleModalHeader: false })
  }

  handleOpenModalHeader() {
    this.setState({ visibleModalHeader: true })
  }

  handleNavigateEditProfile() {
    this.setState({ visibleModalHeader: false })
    this.props.setNavigate('EditProfile', '')
  }

  handleNavigateChangePassword() {
    this.setState({ visibleModalHeader: false })
    this.props.setNavigate('ChangePassword', '')
  }

  handleNavigateReportBug() {
    this.setState({ visibleModalHeader: false })
    this.props.setNavigate('ReportBug', '')
  }

  handleAskLogout() {
    this.setState({ visibleModalHeader: false })
    Alert.alert(
      'Keluar',
      'Apakah anda yakin ingin keluar dari aplikasi ini?',
      [
        { text: 'Batal', onPress: () => {}, style: 'cancel' },
        { text: 'Keluar', onPress: () => this.handleLogout() }
      ],
      { cancelable: false }
    )
  }

  handleLogout() {
    AsyncStorage.removeItem('session')
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })]
      })
    )
  }

  handleActivePageFirst() {
    this.props.setActivePageHome({
      active: 1,
      activePageFirst: true,
      activePageSecond: false,
      activePageThird: false,
      activePageFourth: false,
      activePageFifth: false,
      title: 'Home'
    })
  }

  handleActivePageSecond() {
    this.props.setActivePageHome({
      active: 2,
      activePageFirst: false,
      activePageSecond: true,
      activePageThird: false,
      activePageFourth: false,
      activePageFifth: false,
      title: 'Tweet'
    })
  }

  handleActivePageThird() {
    this.props.setActivePageHome({
      active: 3,
      activePageFirst: false,
      activePageSecond: false,
      activePageThird: true,
      activePageFourth: false,
      activePageFifth: false,
      title: 'Notification'
    })
  }

  handleActivePageFourth() {
    this.props.setActivePageHome({
      active: 4,
      activePageFirst: false,
      activePageSecond: false,
      activePageThird: false,
      activePageFourth: true,
      activePageFifth: false,
      title: 'Profile'
    })
  }

  renderHeader() {
    const { active } = this.props.activePageHome
    if (active === 2) {
      return (
        <Header hasTabs style={styles.header}>
          <Left>
            <Image source={logo} style={styles.logo} />
          </Left>
          <Body />
          <Right>
            <Icon
              name="ios-more"
              style={styles.icon}
              onPress={() => this.handleOpenModalHeader()}
            />
          </Right>
        </Header>
      )
    } else if (active === 3) {
      return (
        <Header hasTabs style={styles.header}>
          <Left>
            <Image source={logo} style={styles.logo} />
          </Left>
          <Body />
          <Right>
            <Icon
              name="ios-more"
              style={styles.icon}
              onPress={() => this.handleOpenModalHeader()}
            />
          </Right>
        </Header>
      )
    } else if (active === 4) {
      return (
        <Header hasTabs style={styles.header}>
          <Left>
            <Image source={logo} style={styles.logo} />
          </Left>
          <Body />
          <Right>
            <Icon
              name="ios-more"
              style={styles.icon}
              onPress={() => this.handleOpenModalHeader()}
            />
          </Right>
        </Header>
      )
    }
    return (
      <Header hasTabs style={styles.headerStart}>
        <Left>
          <Image source={logo} style={styles.logo} />
        </Left>
        <Body />
        <Right>
          <Icon name="ios-more" style={styles.icon} onPress={() => this.handleOpenModalHeader()} />
        </Right>
      </Header>
    )
  }

  renderContent() {
    const { active } = this.props.activePageHome
    if (active === 2) {
      return <TwitterContainer />
    } else if (active === 3) {
      return <NotificationContainer />
    } else if (active === 4) {
      return <ProfileContainer />
    }
    return <HomeContainer />
  }

  render() {
    const { visibleModalHeader } = this.state
    const { activePageHome } = this.props
    return (
      <ComponentPage
        renderHeader={this.renderHeader()}
        renderContent={this.renderContent()}
        visibleModalHeader={visibleModalHeader}
        closeModalHeader={() => this.handleCloseModalHeader()}
        navigateEditProfile={() => this.handleNavigateEditProfile()}
        navigateChangePassword={() => this.handleNavigateChangePassword()}
        navigateReportBug={() => this.handleNavigateReportBug()}
        navigateLogout={() => this.handleAskLogout()}
        handleActivePageFirst={() => this.handleActivePageFirst()}
        activePageFirst={activePageHome.activePageFirst}
        handleActivePageSecond={() => this.handleActivePageSecond()}
        activePageSecond={activePageHome.activePageSecond}
        handleActivePageThird={() => this.handleActivePageThird()}
        activePageThird={activePageHome.activePageThird}
        handleActivePageFourth={() => this.handleActivePageFourth()}
        activePageFourth={activePageHome.activePageFourth}
      />
    )
  }
}

const mapStateToProps = state => ({
  navigate: state.navigate,
  activePageHome: state.activePageHome,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  setActivePageHome: data => dispatch(setActivePageHome(data))
})

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#106538'
  },
  headerStart: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 999
  },
  logo: {
    width: 150,
    height: 150
  },
  icon: {
    color: '#fff'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentContainer)
