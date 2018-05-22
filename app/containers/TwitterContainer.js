import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base'
import Twitter from '../components/Twitter'
import { connect } from 'react-redux'
import OneSignal from 'react-native-onesignal'
import { fetchTweets } from '../actions/twitter'
import { setNavigate } from '../actions/processor'
import ParsedText from 'react-native-parsed-text'
import moment from 'moment'
import Carousel from 'react-native-banner-carousel'

const bannerHeight = 270

class TwitterContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  componentWillMount() {
    OneSignal.addEventListener('opened', this.onOpened)
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened)
  }

  onOpened = openResult => {
    if (openResult.notification.payload.additionalData.screen === 'announcement') {
      this.props.setNavigate('Announcement', openResult.notification.payload.additionalData.data)
    } else if (openResult.notification.payload.additionalData.screen === 'score') {
      this.props.setNavigate('ScoreList')
    }
  }

  textParsed = [
    { type: 'url', style: styles.url },
    {
      pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g,
      style: styles.url
    },
    { pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.username },
    { pattern: /#(\w+)/, style: styles.hashTag }
  ]

  renderImages(image, index) {
    return (
      <View key={index}>
        <Image style={styles.bannerImage} source={{ uri: image.media_url_https }} />
      </View>
    )
  }

  async handleRefresh() {
    const { twitterToken, fetchTweets } = await this.props
    await this.setState({ refreshing: true })
    await fetchTweets(twitterToken.access_token)
    await this.setState({ refreshing: false })
  }

  render() {
    const { tweets } = this.props
    const { refreshing } = this.state
    return (
      <Twitter
        refreshing={refreshing}
        onRefresh={() => this.handleRefresh()}
        tweets={tweets}
        renderTweets={({ item }) => (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: item.user.profile_image_url_https }} />
                <Body>
                  <Text>{item.user.name}</Text>
                  <Text note>@{item.user.screen_name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <View style={styles.viewTweet}>
                <ParsedText style={styles.text} parse={this.textParsed}>
                  {item.text}
                </ParsedText>
              </View>
            </CardItem>
            <CardItem cardBody>
              <View style={styles.viewTweet}>
                <Text note>{moment(item.created_at).format('LLL')}</Text>
              </View>
            </CardItem>
            <CardItem cardBody>
              {item.extended_entities && (
                <Carousel
                  showsPageIndicator={item.extended_entities.media.length > 1 ? true : false}
                  autoplay={true}
                  autoplayTimeout={2000}
                  index={0}>
                  {item.extended_entities.media.map((image, index) =>
                    this.renderImages(image, index)
                  )}
                </Carousel>
              )}
            </CardItem>
          </Card>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  viewTweet: {
    width: '100%',
    marginHorizontal: 15,
    marginBottom: 15
  },
  bannerImage: {
    height: bannerHeight
  },
  contentImage: {
    marginTop: 15
  },
  text: {
    color: 'black',
    fontSize: 15
  },
  url: {
    color: '#00aced'
  },
  username: {
    color: '#00aced',
    fontWeight: 'bold'
  },
  hashTag: {
    color: '#00aced'
  }
})

const mapStateToProps = state => ({
  tweets: state.tweets,
  twitterToken: state.twitterToken
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispacth(setNavigate(link, data)),
  fetchTweets: accessToken => dispatch(fetchTweets(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(TwitterContainer)
