import { API_SERVER } from '../env'
import { RECEIVED_TITLESCORES } from '../constants'
import { setLoading, setFailed, setSuccess } from './processor'

export const fetchTitleScores = (table, accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_TITLESCORES'))
    try {
      const response = await fetch(`${API_SERVER}/${table}?status=1&$sort[createdAt]=-1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
      const data = await response.json()
      await dispatch(receivedTitleScores(data.data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_TITLESCORES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_TITLESCORES'))
    }catch(e) {
        dispatch(setFailed(true, 'SUCCESS_FETCH_TITLESCORES', e))
       dispatch(setLoading(false, 'LOADING_FETCH_TITLESCORES'))
    }
  }
}

const receivedTitleScores = data => ({
	type: RECEIVED_TITLESCORES,
	payload: data
})