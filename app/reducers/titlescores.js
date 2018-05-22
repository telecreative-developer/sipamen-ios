import { RECEIVED_TITLESCORES } from '../constants'

export const titlescores = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_TITLESCORES:
      return action.payload
    default:
      return state
  }
}