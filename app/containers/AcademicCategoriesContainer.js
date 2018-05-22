import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Text } from 'native-base'
import { setNavigate } from '../actions/processor'
import {fetchAcademicCategories} from '../actions/academiccategories'
import AcademicCategories from '../components/AcademicCategories'

class AcademicCategoriesContainer extends React.PureComponent {
	componentWillUnmout() {
		this.props.setNavigate()
	}
	componentDidMount(){
		this.props.fetchAcademicCategories(this.props.sessionPersistance.accessToken)
	}

	render() {
		return (
			<AcademicCategories
				title="Data Kategori"
				handleBack={() => this.props.navigation.goBack()}
				scoreMenu={this.props.academiccategories}
				renderItems={({item}) => (
					<ListItem 
						button 
						onPress={()=> this.props.navigation.navigate('AcademicScores', item)}>
						<Text>{item.academic_title}</Text>
					</ListItem>
				)}
			/>
		)
	}
}

const mapStateToProps = state => ({
	academiccategories: state.academiccategories,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
	fetchAcademicCategories: accessToken => dispatch(fetchAcademicCategories(accessToken)),
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AcademicCategoriesContainer)
