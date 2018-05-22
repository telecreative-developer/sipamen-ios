import { API_SERVER } from '../env'
import { RECEIVED_ACADEMICCATEGORIES } from '../constants'
import { setLoading, setFailed, setSuccess } from './processor'

export const fetchAcademicCategories = (accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICCATEGORIES'))
    try {
      const response = await fetch(`${API_SERVER}/academic-categories?$sort[createdAt]=-1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
      const data = await response.json()
      await dispatch(receivedAcademicCategories(data.data))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_ACADEMICCATEGORIES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICCATEGORIES'))
    }catch(e) {
        dispatch(setFailed(true, 'SUCCESS_FETCH_ACADEMICCATEGORIES', e))
       dispatch(setLoading(false, 'LOADING_FETCH_ACADEMICCATEGORIES'))
    }
  }
}

const receivedAcademicCategories = data => ({
	type: RECEIVED_ACADEMICCATEGORIES,
	payload: data
})
