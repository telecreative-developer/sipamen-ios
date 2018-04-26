import React from 'react'
import { BackHandler, View, Alert } from 'react-native'
import { ListItem, Text } from 'native-base'
import DocumentSection from '../components/DocumentSection'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import { fetchScores } from "../actions/scores"

class DocumentSectionContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    this.props.setNavigate("", "");
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    this.handleBack()
    return true
  }

  async handleBack() {
    await this.props.navigation.goBack()
    await this.props.setNavigate()
  }

  async handleRefresh() {
    const { sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await this.props.fetchScores(sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  handleNavigateToViewer(title, item) {
    const { navigate } = this.props.navigation
    if(item.status) {
      if(title === 'Akademik') {
        navigate('DocumentViewer', {document_title: title, document_subtitle: `${item.title}`, document_url: item.akademik_url})
      }else if(title === 'Kepribadian') {
        navigate('DocumentViewer', {document_title: title, document_subtitle: `${item.title}`, document_url: item.kepribadian_url})
      }else if(title === 'Kesehatan Jasmani') {
        navigate('DocumentViewer', {document_title: title, document_subtitle: `${item.title}`, document_url: item.kesehatan_url})
      }
    }else{
      Alert.alert('Peringatan', `Mohon maaf untuk saat ini Data Nilai "${item.title}" belum dipublish admin`)
    }
  }

  render() {
    const { refreshing } = this.state
    const { scores } = this.props
    const { params } = this.props.navigation.state
    return (
      <DocumentSection
        refreshing={refreshing}
        onRefresh={() => this.handleRefresh()}
        documentTitle={params.documentTitle}
        handleBack={() => this.handleBack()}
        documentData={scores}
        renderDocuments={({item, index}) => (
          <View key={index}>
            <ListItem itemDivider>
              <Text>{item.title}</Text>
            </ListItem>
            <ListItem onPress={() => this.handleNavigateToViewer('Akademik', item)}>
              <Text>Akademik</Text>
            </ListItem>
            <ListItem onPress={() => this.handleNavigateToViewer('Kepribadian', item)}>
              <Text>Kepribadian</Text>
            </ListItem>
            <ListItem onPress={() => this.handleNavigateToViewer('Kesehatan Jasmani', item)}>
              <Text>Kesehatan Jasmani</Text>
            </ListItem>
          </View>
        )}
      />
    )
  }
}

const mapStateToProps = state => ({
  sessionPersistance: state.sessionPersistance,
  scores: state.scores
})

const mapDispatchToProps = dispatch => ({
  fetchScores: (accessToken) => dispatch(fetchScores(accessToken)),
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentSectionContainer)