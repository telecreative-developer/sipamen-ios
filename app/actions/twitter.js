import { TWITTER_CLIENT_CREDENTIAL, TWITTER_SEARCH_TWEETS, TWITTER_BEARER_TOKEN } from '../env'
import { RECEIVED_TWITTER_TOKEN, RECEIVED_TWEETS } from '../constants'
import { setLoading, setFailed, setSuccess } from './processor'

export const fetchTweets = (accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_TWEETS'))
    try {
      const response = await fetch(`${TWITTER_SEARCH_TWEETS}?screen_name=detikcom&include_rts=true`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      const data = await response.json()
      await dispatch(receivedTweets(data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_TWEETS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_TWEETS'))
    }catch(e) {
      dispatch(setFailed(true, 'SUCCESS_FETCH_TWEETS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_TWEETS'))
    }
  }
}

const receivedTweets = data => ({
	type: RECEIVED_TWEETS,
	payload: data
})

export const getBearerToken = () => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_GET_BEARER_TOKEN'))
    try {
      const response = await fetch(`${TWITTER_CLIENT_CREDENTIAL}?grant_type=client_credentials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `Basic ${TWITTER_BEARER_TOKEN}`,
        }
      })
      const data = await response.json()
      await dispatch(receivedTwitterToken(data))
      await dispatch(setSuccess(true, 'SUCCESS_GET_BEARER_TOKEN'))
			await dispatch(setLoading(false, 'LOADING_GET_BEARER_TOKEN'))
    }catch(e) {
      dispatch(setFailed(true, 'SUCCESS_GET_BEARER_TOKEN', e))
			dispatch(setLoading(false, 'LOADING_GET_BEARER_TOKEN'))
    }
  }
}

const receivedTwitterToken = data => ({
	type: RECEIVED_TWITTER_TOKEN,
	payload: data
})