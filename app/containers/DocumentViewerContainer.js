import React from 'react'
import { BackHandler } from 'react-native'
import DocumentViewer from '../components/DocumentViewer'
import { setNavigate } from '../actions/processor'
import { connect } from 'react-redux'


class DocumentViewerContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      fullscreen: false,
      scale: 1.0
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

  async handleBack() {
    await this.props.navigation.goBack()
    await this.props.setNavigate()
  }

  render() {
    const { fullscreen, scale } = this.state
    const { params } = this.props.navigation.state
    return (
      <DocumentViewer
        scale={scale}
        handleBack={() => this.handleBack()}
        documentTitle={params.document_title}
        documentSubtitle={params.document_subtitle}
        fileSource={params.document_url}
        zoomIn={() => this.setState({scale: scale+0.1})}
        zoomOut={() => this.setState({scale: scale-0.1})}
        documentFullscreen={fullscreen}
        handleTap={() => this.setState({fullscreen: !fullscreen})} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(null, mapDispatchToProps)(DocumentViewerContainer)