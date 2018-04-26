import { API_SERVER } from '../env'
import { setLoading, setFailed, setSuccess } from './processor'

const toLower = str => {
  return str.replace(/\s/g, '').toLowerCase()
}

const capitalizeFirstLetter = str => {
  return str.replace(/\w\S*/g, function(result) {
    return result.charAt(0).toUpperCase() + result.substr(1).toLowerCase()
  })
}

export const register = item => {
  return async dispatch => {
    await dispatch(setFailed(false, 'FAILED_REGISTER'))
    await dispatch(setLoading(true, 'LOADING_REGISTER'))
    try {
      const response = await fetch(`${API_SERVER}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...item,
          first_name: capitalizeFirstLetter(item.first_name),
          last_name: capitalizeFirstLetter(item.last_name),
          email: toLower(item.email),
          verified: false
        })
      })
      const data = await response.json()
      if (data.code === 400 && data.errors[0].path === 'email') {
        await dispatch(
          setFailed(true, 'FAILED_REGISTER', 'Email sudah digunakan')
        )
        await dispatch(setLoading(false, 'LOADING_REGISTER'))
      } else {
        await dispatch(setSuccess(true, 'SUCCESS_REGISTER'))
        await dispatch(setLoading(false, 'LOADING_REGISTER'))
        await dispatch(setSuccess(false, 'SUCCESS_REGISTER'))
      }
    } catch (e) {
      await dispatch(
        setFailed(true, 'FAILED_REGISTER', 'Ada sesuatu yang salah')
      )
      await dispatch(setLoading(false, 'LOADING_REGISTER'))
    }
  }
}