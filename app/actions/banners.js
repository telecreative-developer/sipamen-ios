import { setLoading, setFailed, setSuccess } from './processor'
import { RECEIVED_BANNERS } from '../constants'
import { API_SERVER } from '../env'

export const fetchBanners = (accessToken) => {
  return async dispatch => {
    await dispatch(setLoading(true, 'LOADING_FETCH_BANNERS'))
    try {
      const response = await fetch(`${API_SERVER}/banners`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
      const data = await response.json()
      await dispatch(receivedBanners(data.data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_BANNERS'))
      await dispatch(setLoading(false, 'LOADING_FETCH_BANNERS'))
    }catch(e) {
      dispatch(setFailed(true, 'FAILED_FETCH_BANNERS', e))
      dispatch(setLoading(false, 'LOADING_FETCH_BANNERS'))
    }
  }
}

const receivedBanners = data => ({
  type: RECEIVED_BANNERS,
  payload: data
})