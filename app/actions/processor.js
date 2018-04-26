import { SET_LOADING, SET_DOWNLOAD_LOADING, SET_SUCCESS, SET_DOWNLOAD_SUCCESS, SET_FAILED, SET_DOWNLOAD_FAILED, ON_SET_NAVIGATE, ON_SET_ACTIVE_PAGE_HOME } from '../constants'

export const setLoading = (condition, process_on) => ({
	type: SET_LOADING,
	condition,
	process_on
})

export const setSuccess = (condition, process_on) => ({
	type: SET_SUCCESS,
	condition,
	process_on
})

export const setFailed = (condition, process_on, message) => ({
	type: SET_FAILED,
	condition,
	process_on,
	message
})

export const setDownloadLoading = (index, condition, process_on) => ({
	type: SET_DOWNLOAD_LOADING,
	index,
	condition,
	process_on
})

export const setDownloadSuccess = (index, condition, process_on) => ({
	type: SET_DOWNLOAD_SUCCESS,
	index,
	condition,
	process_on
})

export const setDownloadFailed = (index, condition, process_on, message) => ({
	type: SET_DOWNLOAD_FAILED,
	index,
	condition,
	process_on,
	message
})

export const setNavigate = (link, data) => ({
	type: ON_SET_NAVIGATE,
	link,
	data
})

export const setActivePageHome = data => ({
	type: ON_SET_ACTIVE_PAGE_HOME,
	payload: data
})