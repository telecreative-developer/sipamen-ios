import { API_SERVER } from '../env'
import { RECEIVED_SCORES } from '../constants'
import { setLoading, setFailed, setSuccess } from './processor'

export const fetchScores = (accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_SCORES'))
    try {
      const response = await fetch(`${API_SERVER}/scores?$sort[createdAt]=-1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
      const data = await response.json()
      await dispatch(receivedScores(data.data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_SCORES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_SCORES'))
    }catch(e) {
      dispatch(setFailed(true, 'SUCCESS_FETCH_SCORES', e))
			dispatch(setLoading(false, 'LOADING_FETCH_SCORES'))
    }
  }
}

const receivedScores = data => ({
	type: RECEIVED_SCORES,
	payload: data
})