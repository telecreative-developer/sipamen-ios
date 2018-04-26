import { setLoading, setFailed, setSuccess } from './processor'
import { RECEIVED_FETCH_POK_UJI } from '../constants'
import { API_SERVER } from '../env'

export const fetchPokUji = (accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_POK_UJI'))
		try {
			const response = await fetch(`${API_SERVER}/pokuji-documents`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
      const data = await response.json()
			await dispatch(receivedPokUji(data.data[0]))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_POK_UJI'))
			await dispatch(setLoading(false, 'LOADING_FETCH_POK_UJI'))
		}catch(e) {
			dispatch(setFailed(true, 'FAILED_FETCH_POK_UJI', e))
			dispatch(setLoading(false, 'LOADING_FETCH_POK_UJI'))
		}
	}
}

const receivedPokUji = data => ({
	type: RECEIVED_FETCH_POK_UJI,
	payload: data
})
