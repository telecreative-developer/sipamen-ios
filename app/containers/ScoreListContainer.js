import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Text } from 'native-base'
import { setNavigate } from '../actions/processor'
import ScoreList from '../components/ScoreList'

const scoreMenu = [
	{
		menu: 'Akademik',
		table: 'academic_categories'
	},
	{
		menu: 'Kepribadian',
		table: 'personalities-scores'
	},
	{
		menu: 'Kesehatan Jasmani',
		table: 'health-scores'
	},
	{
		menu: 'Nilai Kegiatan Khusus',
		table: 'activities-scores'
	},
	{
		menu: 'Nilai Gabungan',
		table: 'gabungan-scores'
	}
]

class ScoreListContainer extends React.PureComponent {
	componentWillUnmout() {
		this.props.setNavigate()
	}

	render() {
		return (
			<ScoreList
				title="Data Nilai"
				handleBack={() => this.props.navigation.goBack()}
				scoreMenu={scoreMenu}
				renderItems={({ item }) => {
					if(item.menu == 'Akademik'){
						return (
							<ListItem 
								button 
								onPress={()=> this.props.navigation.navigate('AcademicCategories', item)}
							>
								<Text>{item.menu}</Text>
							</ListItem>
						)
					}
					return (
						<ListItem 
							button 
							onPress={()=> this.props.navigation.navigate('TitleScores', {title: item.menu, table: item.table})}
						>
							<Text>{item.menu}</Text>
						</ListItem>
					)

				}
			}
			/>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(null, mapDispatchToProps)(ScoreListContainer)
