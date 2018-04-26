import { RECEIVED_TWITTER_TOKEN, RECEIVED_TWEETS } from '../constants'

export const twitterToken = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_TWITTER_TOKEN:
			return action.payload
		default:
			return state
	}
}

export const tweets = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_TWEETS:
			return action.payload
		default:
			return state
	}
}