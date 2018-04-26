import { RECEIVED_BANNERS } from '../constants'

export const banners = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_BANNERS:
      return action.payload
    default:
      return state
  }
}