import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Text } from 'native-base'
import { setNavigate } from '../actions/processor'
import  TitleScores from '../components/TitleScores'
import {fetchTitleScores} from '../actions/titlescores'


class TitleScoresContainer extends React.PureComponent {
	componentWillUnmout() {
		this.props.setNavigate()
	}
	componentDidMount(props){
		this.props.fetchTitleScores(this.props.navigation.state.params.table, this.props.sessionPersistance.accessToken)
	}

	
	render() {
		const {title, table} = this.props.navigation.state.params;
		return (
			<TitleScores
				title={title}
				handleBack={() => this.props.navigation.goBack()}
				scoreMenu={this.props.titlescores}
				renderItems={({item}) => (
					<ListItem button onPress={()=> this.props.navigation.navigate('DocumentViewer', {
						item,
						document_url: item.file_url,
						document_title: item.title
					})}>
						<Text>
							{table === 'activities-scores' ? item.title  : item.tipe}
						</Text>
					</ListItem>
				)}
			/>
		)
	}
}

const mapStateToProps = state => ({
	titlescores: state.titlescores,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
	fetchTitleScores: (table, accessToken) => dispatch(fetchTitleScores(table, accessToken)),
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TitleScoresContainer)
