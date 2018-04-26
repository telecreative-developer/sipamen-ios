import { setLoading, setFailed, setSuccess } from './processor'
import { RECEIVED_COMMENTS } from '../constants'
import { sendNotification, saveNotification } from './notifications'
import { API_SERVER } from '../env'

export const fetchComments = (postId, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_COMMENTS'))
		try {
			const response = await fetch(`${API_SERVER}/post-comments?post_id=${postId}&$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(receivedComments(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_COMMENTS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_COMMENTS'))
		}catch(e) {
			dispatch(setFailed(true, 'FAILED_FETCH_COMMENTS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_COMMENTS'))
		}
	}
}

const receivedComments = data => ({
	type: RECEIVED_COMMENTS,
	payload: data
})

export const sendComment = (userId, userName, data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SEND_COMMENT'))
		try {
			await fetch(`${API_SERVER}/post-comments`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
      if(userId !== data.id) {
        await dispatch(sendNotification(userId, `${userName} mengomentari kegiatan anda: "${data.comment}"`, accessToken))
        await dispatch(saveNotification({type: 'comment', content: data.comment, post_id: data.post_id, myid: userId, id: data.id}, accessToken))
			}
      await dispatch(fetchComments(data.post_id, accessToken))
			await dispatch(setSuccess(true, 'SUCCESS_SEND_COMMENT'))
			await dispatch(setLoading(false, 'LOADING_SEND_COMMENT'))
		}catch (e) {
			dispatch(setFailed(true, 'FAILED_SEND_COMMENT', e))
			dispatch(setLoading(false, 'LOADING_SEND_COMMENT'))
		}
	}
}