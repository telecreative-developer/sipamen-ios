import React from 'react'
import { StyleSheet, View, Dimensions, FlatList, StatusBar } from 'react-native'
import { Container, Content, Grid, Col, Button, Icon, Text } from 'native-base'
import PropTypes from 'prop-types'
import Carousel from 'react-native-banner-carousel'

const { height } = Dimensions.get('window')

const bannerWidth = Dimensions.get('window').width

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns)
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
    numberOfElementsLastRow++
  }
  return data
}

const numColumns = 3

const Home = (props) => (
  <Container>
     <StatusBar
      backgroundColor="#146639"
      barStyle="light-content"
    />
    <Carousel
      autoplay={true}
      autoplayTimeout={2000}
      loop={true}
      index={0}
      pageSize={bannerWidth}>
      {props.banners}
    </Carousel>
    <Content showsVerticalScrollIndicator={false}>
      <Grid style={styles.grid}>
        <Col style={styles.leftCol}>
          <Button transparent onPress={props.navigateInfo} style={styles.buttonDouble}>
            <Icon name='md-information-circle' style={styles.icon} />
            <Text style={styles.topButtonText} uppercase={false}>Info Sespimmen</Text>
          </Button>
        </Col>
        <Col style={styles.rightCol}>
          <Button transparent onPress={props.navigateCalendar} style={styles.buttonDouble}>
            <Icon name='md-calendar' style={styles.icon} />
            <Text style={styles.topButtonText} uppercase={false}>Kalender</Text>
          </Button>
        </Col>
      </Grid>
      <View style={styles.boxMenu}>
        <Text style={styles.title}>Program Pendidikan SESPIMMEN</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={formatData(props.dataMenus, numColumns)}
          style={styles.container}
          renderItem={props.renderMenus}
          numColumns={numColumns} />
      </View>
    </Content>
  </Container>
)

Home.propTypes = {
  banners: PropTypes.any,
  navigateInfo: PropTypes.func,
  navigateCalender: PropTypes.func,
  dataMenus: PropTypes.array,
  renderMenus: PropTypes.any
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: '#fff',
    height: height / 16,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC'
  },
  buttonDouble: {
    width: '100%',
    justifyContent: 'center'
  },
  leftCol: {
    borderRightWidth: 1,
    borderColor: '#D9D5DC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  rightCol: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  icon: {
    fontSize: 14,
    color: '#2f2f4f',
    marginRight: 0
  },
  topButtonText: {
    fontSize: 12,
    color: '#2f2f4f',
    marginLeft: 0
  },
  horizontalMenu: {
    backgroundColor: '#fff',
    height: height / 18,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
  },
  boxMenu: {
    padding: 10
  },
  title: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-SemiBold',
    marginLeft: 5,
    marginBottom: 7
  }
})

export default Home
