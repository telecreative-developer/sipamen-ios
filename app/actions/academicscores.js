import { API_SERVER } from '../env'
import { RECEIVED_ACADEMICSCORES } from '../constants'
import { setLoading, setFailed, setSuccess } from './processor'

export const fetchAcademicScores = (id, accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICSCORES'))
    try {
      const response = await fetch(`${API_SERVER}/academic-scores?academic_category_id=${id}&status=1&$sort[createdAt]=-1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
      const data = await response.json()
      await dispatch(receivedAcademicScores(data.data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_ACADEMICSCORES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICSCORES'))
    }catch(e) {
        dispatch(setFailed(true, 'SUCCESS_FETCH_ACADEMICSCORES', e))
       dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICSCORES'))
    }
  }
}

const receivedAcademicScores = data => ({
	type: RECEIVED_ACADEMICSCORES,
	payload: data
})