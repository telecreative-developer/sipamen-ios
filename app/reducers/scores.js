import { RECEIVED_SCORES } from '../constants'

export const scores = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_SCORES:
      return action.payload
    default:
      return state
  }
}