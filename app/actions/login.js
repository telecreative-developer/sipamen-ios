import { AsyncStorage } from 'react-native'
import { setLoading, setFailed, setSuccess } from './processor'
import { SAVE_SESSION_PERSISTANCE } from '../constants'
import { initialOneSignal } from './notifications'
import { API_SERVER } from '../env'
import { fetchDocuments } from './documents'
import { getBearerToken } from './twitter'
import { fetchScores } from './scores'
import {fetchPokUji} from "./pokuji";

export const login = (email, password, onesignalId) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_PROCESS_LOGIN'))
		try {
			const response = await fetch(`${API_SERVER}/authentication`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email, password, strategy: 'local'})
			})
			const data = await response.json()
			if (data.code === 401 && data.name === 'NotAuthenticated') {
				await dispatch(setFailed(true, 'FAILED_PROCESS_LOGIN', 'Email atau kata sandi salah'))
				await dispatch(setLoading(false, 'LOADING_PROCESS_LOGIN'))
			} else {
				await dispatch(fetchUserWithEmail(email, password, data.accessToken, onesignalId))
				await dispatch(fetchDocuments('standar-kompetensi', data.accessToken))
				await dispatch(fetchDocuments('data-serdik', data.accessToken))
				await dispatch(fetchDocuments('handbook', data.accessToken))
        await dispatch(fetchDocuments('info-sespimmen', data.accessToken))
				await dispatch(getBearerToken())
				await dispatch(setSuccess(true, 'SUCCESS_PROCESS_LOGIN'))
				await dispatch(setLoading(false, 'LOADING_PROCESS_LOGIN'))
			}
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_PROCESS_LOGIN', e))
			dispatch(setLoading(false, 'LOADING_PROCESS_LOGIN'))
			dispatch(setFailed(false, 'FAILED_PROCESS_LOGIN'))
		}
	}
}

const fetchUserWithEmail = (email, password, accessToken, onesignalId) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_USER_WITH_EMAIL'))
		try {
			const response = await fetch(`${API_SERVER}/users?email=${email}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
    	if (data.data[0].verified === 0) {
        await dispatch(setFailed(true, 'FAILED_PROCESS_LOGIN', 'Akun Anda dalam proses pengecekan admin, silahkan tunggu sampai admin mengkonfirmasi akun Anda.'))
        await dispatch(setLoading(false, 'LOADING_PROCESS_LOGIN'))
      }else{
        if(onesignalId !== undefined) {
          dispatch(initialOneSignal({onesignal_id: onesignalId, id: data.data[0].id}, accessToken))
        }
        await dispatch(fetchScores(accessToken))
				await dispatch(fetchPokUji(accessToken)),
        await dispatch(saveSession({ email, password, accessToken }))
        await dispatch(saveSessionPersistance({...data.data[0], accessToken}))
        await dispatch(setSuccess(true, 'SUCCESS_FETCH_USER_WITH_EMAIL'))
        await dispatch(setLoading(false, 'LOADING_FETCH_USER_WITH_EMAIL'))
			}
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_USER_WITH_EMAIL', e))
			dispatch(setLoading(false, 'LOADING_FETCH_USER_WITH_EMAIL'))
		}
	}
}

const saveSession = data => {
	return () => {
		AsyncStorage.setItem('session', JSON.stringify(data))
	}
}

export const saveSessionPersistance = data => ({
	type: SAVE_SESSION_PERSISTANCE,
	payload: data
})