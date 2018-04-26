import { RECEIVED_POSTS, RECEIVED_MY_POSTS } from '../constants'

export const posts = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_POSTS:
			return action.payload
		default:
			return state
	}
}

export const myPosts = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_MY_POSTS:
			return action.payload
		default:
			return state
	}
}