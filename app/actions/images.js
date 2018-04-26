import { ADD_IMAGE, CANCEL_IMAGE } from '../constants'

let id = 1

export const addImage = (image) => ({
  type: ADD_IMAGE,
  payload: {
    id: id++,
    image: image
  }
})

export const cancelImage = (data) => ({
  type: CANCEL_IMAGE,
  id: data.id
})