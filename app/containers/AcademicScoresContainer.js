import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Text } from 'native-base'
import { setNavigate } from '../actions/processor'
import  AcademicScores from '../components/AcademicScores'
import {fetchAcademicScores} from '../actions/academicscores'


class AcademicScoresContainer extends React.PureComponent {
	componentWillUnmout() {
		this.props.setNavigate()
	}
	componentDidMount(){
		this.props.fetchAcademicScores(this.props.navigation.state.params.academic_category_id, this.props.sessionPersistance.accessToken)
	}

	
	render() {
		return (
			<AcademicScores
				title="Data Akademik"
				handleBack={() => this.props.navigation.goBack()}
				scoreMenu={this.props.academicscores}
				renderItems={({item}) => (
					<ListItem button onPress={()=> this.props.navigation.navigate('DocumentViewer', {
						item,
						document_url: item.file_url,
						document_title: item.title
					})}>
						<Text>{item.title}</Text>
					</ListItem>
				)}
			/>
		)
	}
}

const mapStateToProps = state => ({
	academicscores: state.academicscores,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
	fetchAcademicScores: (id, accessToken) => dispatch(fetchAcademicScores(id, accessToken)),
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AcademicScoresContainer)
