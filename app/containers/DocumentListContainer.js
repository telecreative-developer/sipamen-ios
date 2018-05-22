import React from 'react'
import { BackHandler } from 'react-native'
import { ListItem, Text, Body, Button, Right, Icon } from 'native-base'
import DocumentList from '../components/DocumentList'
import { downloadDocument, fetchDocuments } from '../actions/documents'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'

class DocumentListContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      refreshing: false
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
  }

  backPressed = () => {
    this.handleBack()
    return true
  }

  async handleRefresh() {
    const { sessionPersistance } = await this.props
    const { params } = await this.props.navigation.state
    await this.setState({refreshing: true})
    await this.props.fetchDocuments(params.documentSlug, sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  async handleBack() {
    await this.props.navigation.goBack()
    await this.props.setNavigate()
  }

  render() {
    const { refreshing } = this.state
    const { params } = this.props.navigation.state
    const { navigate } = this.props.navigation
    const { downloadDocument, dataSerdik, dataHandbook }  = this.props
    return (
      <DocumentList
        refreshing={refreshing}
        onRefresh={() => this.handleRefresh()}
        documentTitle={params.documentTitle}
        handleBack={() => this.handleBack()}
        documentData={params.documentSlug === 'handbook' ? dataHandbook : dataSerdik}
        renderDocuments={({item, index}) => (
          <ListItem onPress={() => navigate('DocumentViewer', item)}>
            <Body>
              <Text>{item.document_title}</Text>
            </Body>
            {params.download && (
              <Right>
                <Button transparent onPress={() => downloadDocument(index, item.document_url)}>
                  <Icon name='download' style={{color: '#106538'}} />
                </Button>
              </Right>
            )}
          </ListItem>
        )}
      />
    )
  }
}

const mapStateToProps = state => ({
  sessionPersistance: state.sessionPersistance,
  dataSerdik: state.dataSerdik,
  dataHandbook: state.dataHandbook,
  loadingDownload: state.loadingDownload,
  successDownload: state.successDownload
})

const mapDispatchToProps = dispatch => ({
  fetchDocuments: (type, accessToken) => dispatch(fetchDocuments(type, accessToken)),
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  downloadDocument: (index, document_url) => dispatch(downloadDocument(index, document_url))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListContainer)