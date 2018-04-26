import {ADD_IMAGE, CANCEL_IMAGE} from '../constants'

export const dataImages = (state = [], action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return state.length === 0 ? [action.payload] : [...state, action.payload]
    case CANCEL_IMAGE:
      return state.filter(d => d.id !== action.id)
    default:
      return state
  }
}