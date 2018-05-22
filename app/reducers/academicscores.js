import { RECEIVED_ACADEMICSCORES } from '../constants'

export const academicscores = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_ACADEMICSCORES:
      return action.payload
    default:
      return state
  }
}