import { RECEIVED_COMMENTS } from '../constants'

export const comments = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_COMMENTS:
			return action.payload
		default:
			return state
	}
}