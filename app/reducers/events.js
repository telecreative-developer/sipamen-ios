import { RECEIVED_EVENTS } from '../constants'

export const events = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_EVENTS:
			return action.payload
		default:
			return state
	}
}