import { SET_LOADING, SET_SUCCESS, SET_FAILED, ON_SET_NAVIGATE, ON_SET_ACTIVE_PAGE_HOME, SET_DOWNLOAD_FAILED, SET_DOWNLOAD_SUCCESS, SET_DOWNLOAD_LOADING } from '../constants'

const initialStateActivePageHome = {
	title: 'Home',
	active: 1,
	activePageFirst: true,
	activePageSecond: false,
	activePageThird: false,
	activePageFourth: false,
	activePageFifth: false
}

export const loading = (state = [], action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				condition: action.condition,
				process_on: action.process_on
			}
		default:
			return state
	}
}

export const loadingDownload = (state = [], action) => {
	switch (action.type) {
		case SET_DOWNLOAD_LOADING:
			return {
				index: action.index,
				condition: action.condition,
				process_on: action.process_on
			}
		default:
			return state
	}
}

export const success = (state = [], action) => {
	switch (action.type) {
		case SET_SUCCESS:
			return {
				condition: action.condition,
				process_on: action.process_on
			}
		default:
			return state
	}
}

export const successDownload = (state = [], action) => {
	switch (action.type) {
		case SET_DOWNLOAD_SUCCESS:
			return {
				condition: action.condition,
				process_on: action.process_on
			}
		default:
			return state
	}
}

export const failed = (state = [], action) => {
	switch (action.type) {
		case SET_FAILED:
			return {
				condition: action.condition,
				process_on: action.process_on,
				message: action.message
			}
		default:
			return state
	}
}

export const failedDownload = (state = [], action) => {
	switch (action.type) {
		case SET_DOWNLOAD_FAILED:
			return {
				index: action.index,
				condition: action.condition,
				process_on: action.process_on,
				message: action.message
			}
		default:
			return state
	}
}

export const navigate = (state = [], action) => {
	switch (action.type) {
		case ON_SET_NAVIGATE:
			return {
				link: action.link,
				data: action.data
			}
		default:
			return state
	}
}

export const activePageHome = (state = initialStateActivePageHome, action) => {
	switch (action.type) {
		case ON_SET_ACTIVE_PAGE_HOME:
			return action.payload
		default:
			return state
	}
}