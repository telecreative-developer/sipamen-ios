import { RECEIVED_NOTIFICATIONS, RECEIVED_GENERAL_NOTIFICATION_EVENTS, RECEIVED_GENERAL_NOTIFICATION_ANNOUNCEMENTS } from '../constants'

export const notifications = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_NOTIFICATIONS:
			return action.payload
		default:
			return state
	}
}

export const generalNotificationEvents = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_GENERAL_NOTIFICATION_EVENTS:
			return action.payload
		default:
			return state
	}
}

export const generalNotificationAnnouncements = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_GENERAL_NOTIFICATION_ANNOUNCEMENTS:
      return action.payload
    default:
      return state
  }
}