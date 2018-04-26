import OneSignal from 'react-native-onesignal'
import { setLoading, setFailed, setSuccess } from './processor'
import { RECEIVED_NOTIFICATIONS, RECEIVED_GENERAL_NOTIFICATION_EVENTS, RECEIVED_GENERAL_NOTIFICATION_ANNOUNCEMENTS } from '../constants'
import { API_SERVER } from '../env'

export const initialOneSignal = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_INITIAL_ONESIGNAL'))
		try {
			await fetch(`${API_SERVER}/onesignal`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			await dispatch(setSuccess(true, 'SUCCESS_INITIAL_ONESIGNAL'))
			await dispatch(setLoading(false, 'LOADING_INITIAL_ONESIGNAL'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_INITIAL_ONESIGNAL', e))
			dispatch(setLoading(false, 'LOADING_INITIAL_ONESIGNAL'))
		}
	}
}

export const disinitialOneSignal = (onesignal_id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_INITIAL_ONESIGNAL'))
		try {
			await fetch(`${API_SERVER}/onesignal?onesignal_id=${onesignal_id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			await dispatch(setSuccess(true, 'SUCCESS_INITIAL_ONESIGNAL'))
			await dispatch(setLoading(false, 'LOADING_INITIAL_ONESIGNAL'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_INITIAL_ONESIGNAL', e))
			dispatch(setLoading(false, 'LOADING_INITIAL_ONESIGNAL'))
		}
	}
}

export const fetchNotifications = (myid, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_NOTIFICATIONS'))
		try {
			const response = await fetch(`${API_SERVER}/notifications?myid=${myid}&$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
      const data = await response.json()
      const responseThumbnails = await fetch(`${API_SERVER}/thumbnails?$sort[createdAt]=-1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      })
			const dataThumbnails = await responseThumbnails.json()
			await dispatch(receivedNotifications(data.data.map(d => ({
        ...d,
        posts: d.posts.map(dp => ({
          ...dp,
          thumbnails: dataThumbnails.data.filter(df => df.post_id === dp.post_id)
        }))
      }))))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_NOTIFICATIONS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_NOTIFICATIONS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_NOTIFICATIONS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_NOTIFICATIONS'))
		}
	}
}

const receivedNotifications = data => ({
	type: RECEIVED_NOTIFICATIONS,
	payload: data
})

export const fetchGeneralNotifications = (accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_GENERAL_NOTIFICATIONS'))
		try {
			const response = await fetch(`${API_SERVER}/notifications?type[$in]=event&type[$in]=announcement&$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(receivedGeneralNotificationEvents(data.data.filter(d => d.type === 'event')))
      await dispatch(receivedGeneralNotificationAnnouncements(data.data.filter(d => d.type === 'announcement')))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_GENERAL_NOTIFICATIONS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_GENERAL_NOTIFICATIONS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_GENERAL_NOTIFICATIONS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_GENERAL_NOTIFICATIONS'))
		}
	}
}

const receivedGeneralNotificationEvents = data => ({
	type: RECEIVED_GENERAL_NOTIFICATION_EVENTS,
	payload: data
})

const receivedGeneralNotificationAnnouncements = data => ({
  type: RECEIVED_GENERAL_NOTIFICATION_ANNOUNCEMENTS,
  payload: data
})

export const sendNotification = (userId, item, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SEND_NOTIFICATION'))
		try {
			const response = await fetch(`${API_SERVER}/onesignal?id=${userId}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			await data.data.forEach(d => {
				OneSignal.postNotification({'en': item, 'id': item}, '', d.onesignal_id)
			})
			await dispatch(setSuccess(true, 'SUCCESS_SEND_NOTIFICATION'))
			await dispatch(setLoading(false, 'LOADING_SEND_NOTIFICATION'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_SEND_NOTIFICATION', e))
			dispatch(setLoading(false, 'LOADING_SEND_NOTIFICATION'))
		}
	}
}

export const saveNotification = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SAVE_NOTIFICATION'))
		try {
			await fetch(`${API_SERVER}/notifications`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			await dispatch(setSuccess(true, 'SUCCESS_SAVE_NOTIFICATION'))
			await dispatch(setLoading(false, 'LOADING_SAVE_NOTIFICATION'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_SAVE_NOTIFICATION', e))
			dispatch(setLoading(false, 'LOADING_SAVE_NOTIFICATION'))
		}
	}
}