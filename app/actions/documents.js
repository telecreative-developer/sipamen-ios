import { setLoading, setFailed, setSuccess, setDownloadSuccess, setDownloadLoading, setDownloadFailed } from './processor'
import { DATA_STANDAR_KOMPETENSI, DATA_INFO_SESPIMMEN, DATA_SERDIK, DATA_HANDBOOK } from '../constants'
import RNFetchBlob from 'react-native-fetch-blob'
import { API_SERVER } from '../env'

export const fetchDocuments = (type, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_DOCUMENTS'))
		try {
			const response = await fetch(`${API_SERVER}/documents?document_type=${type}&$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken
				}
			})
			const data = await response.json()
			if(type === 'standar-kompetensi') {
        dispatch(dataStandarKompetensi(data.data[0]))
      }else if(type === 'data-serdik') {
        dispatch(dataSerdik(data.data))
      }else if(type === 'handbook') {
        dispatch(dataHanbook(data.data))
      }else if(type === 'info-sespimmen') {
        dispatch(dataInfoSespimmen(data.data[0]))
      }
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_DOCUMENTS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_DOCUMENTS'))
		}catch(e) {
			dispatch(setFailed(true, 'FAILED_FETCH_DOCUMENTS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_DOCUMENTS'))
		}
	}
}

const dataStandarKompetensi = data => ({
	type: DATA_STANDAR_KOMPETENSI,
	payload: data
})

const dataSerdik = data => ({
	type: DATA_SERDIK,
	payload: data
})

const dataHanbook = data => ({
	type: DATA_HANDBOOK,
	payload: data
})

const dataInfoSespimmen = data => ({
  type: DATA_INFO_SESPIMMEN,
  payload: data
})

export const downloadDocument = (index, document_url) => {
	return async dispatch => {
		await dispatch(setDownloadLoading(index, true, 'LOADING_DOWNLOAD_DOCUMENT'))
		try {
			let dirs = await RNFetchBlob.fs.dirs
			await RNFetchBlob.config({
				fileCache : true,
				path: dirs.DocumentDir,
				addAndroidDownloads : {
					useDownloadManager : true, 
					notification : true,
					overwrite: true
			}
			}).fetch('GET', document_url)
			await dispatch(setDownloadSuccess(index, true, 'SUCCESS_DOWNLOAD_DOCUMENT'))
			await dispatch(setDownloadLoading(index, false, 'LOADING_DOWNLOAD_DOCUMENT'))
		}catch(e) {
			dispatch(setDownloadSuccess(index, true, 'SUCCESS_DOWNLOAD_DOCUMENT'))
			dispatch(setDownloadLoading(index, false, 'LOADING_DOWNLOAD_DOCUMENT'))
		}
	}
}