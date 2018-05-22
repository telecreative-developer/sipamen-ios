import { RECEIVED_ACADEMICCATEGORIES } from '../constants'

export const academiccategories = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_ACADEMICCATEGORIES:
      return action.payload
    default:
      return state
  }
}