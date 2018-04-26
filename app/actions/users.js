import { setLoading, setFailed, setSuccess } from './processor'
import { login, saveSessionPersistance } from './login'
import { API_SERVER } from '../env'

export const changePassword = (id, email, password, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_UPDATE_PASSWORD'))
		try {
			await fetch(`${API_SERVER}/users/${id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({password: password})
			})
			await dispatch(login(email, password))
			await dispatch(setSuccess(true, 'SUCCESS_UPDATE_PASSWORD'))
			await dispatch(setLoading(false, 'LOADING_UPDATE_PASSWORD'))
			await dispatch(setSuccess(false, 'SUCCESS_UPDATE_PASSWORD'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_UPDATE_PASSWORD', e))
			await dispatch(setLoading(false, 'LOADING_UPDATE_PASSWORD'))
		}
	}
}

export const updateProfile = (id, item, password, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_UPDATE_PROFILE'))
		try {
			const response = await fetch(`${API_SERVER}/users/${id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(item)
			})
			const data = await response.json()
			if (data.code === 400 && data.errors[0].path === 'email') {
				await dispatch(setFailed(true, 'FAILED_UPDATE_PROFILE', 'Email sudah digunakan'))
				await dispatch(setLoading(false, 'LOADING_UPDATE_PROFILE'))
			} else {
				await dispatch(login(item.email, password))
				await dispatch(setSuccess(true, 'SUCCESS_UPDATE_PROFILE'))
				await dispatch(setLoading(false, 'LOADING_UPDATE_PROFILE'))
				await dispatch(setSuccess(false, 'SUCCESS_UPDATE_PROFILE'))
			}
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_UPDATE_PROFILE', e))
			dispatch(setLoading(false, 'LOADING_UPDATE_PROFILE'))
		}
	}
}

export const updateProfileWithImage = (id, image, item, password, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_UPDATE_PROFILE'))
		try {
			const response = await fetch(`${API_SERVER}/upload-avatar-user`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({uri: image})
			})
			const data = await response.json()
			await dispatch(updateProfile(id, {avatar_url: `${API_SERVER}/files/users/avatars/${data.id}`, ...item}, password, accessToken))
			await dispatch(setSuccess(true, 'SUCCESS_UPDATE_PROFILE'))
			await dispatch(setLoading(false, 'LOADING_UPDATE_PROFILE'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_UPDATE_PROFILE', e))
			await dispatch(setLoading(false, 'LOADING_UPDATE_PROFILE'))
		}
	}
}