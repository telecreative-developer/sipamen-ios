import {DATA_STANDAR_KOMPETENSI, DATA_SERDIK, DATA_HANDBOOK, DATA_INFO_SESPIMMEN} from '../constants'

export const dataStandarKompetensi = (state = [], action) => {
	switch (action.type) {
		case DATA_STANDAR_KOMPETENSI:
			return action.payload
		default:
			return state
	}
}

export const dataSerdik = (state = [], action) => {
	switch (action.type) {
		case DATA_SERDIK:
			return action.payload
		default:
			return state
	}
}

export const dataHandbook = (state = [], action) => {
	switch (action.type) {
		case DATA_HANDBOOK:
			return action.payload
		default:
			return state
	}
}

export const dataInfoSespimmen = (state = [], action) => {
  switch (action.type) {
    case DATA_INFO_SESPIMMEN:
      return action.payload
    default:
      return state
  }
}