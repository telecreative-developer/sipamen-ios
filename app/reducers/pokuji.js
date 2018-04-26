import { RECEIVED_FETCH_POK_UJI } from '../constants'

export const pokUji = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_FETCH_POK_UJI:
			return action.payload
		default:
			return state
	}
}