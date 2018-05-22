import { combineReducers } from 'redux'
import { loading, loadingDownload, success, successDownload, failed, failedDownload, navigate, activePageHome } from './processor'
import { sessionPersistance } from './login'
import { posts, myPosts } from './posts'
import { events } from './events'
import { comments } from './comments'
import { notifications, generalNotificationEvents, generalNotificationAnnouncements } from './notifications'
import { dataStandarKompetensi, dataSerdik, dataHandbook, dataInfoSespimmen } from './documents'
import { pokUji } from './pokuji'
import { twitterToken, tweets } from './twitter'
import { scores } from './scores'
import { dataImages } from './images'
import { banners } from "./banners"
import { academiccategories } from "./academiccategories"
import { academicscores } from "./academicscores"
import { titlescores } from "./titlescores"

const rootReducers = combineReducers({
  posts, events, banners, comments, sessionPersistance, notifications,
  loading, loadingDownload, success, successDownload, failed, failedDownload,
  navigate, activePageHome, myPosts, generalNotificationEvents, generalNotificationAnnouncements, twitterToken,
  dataStandarKompetensi, dataSerdik, dataHandbook, dataInfoSespimmen, pokUji, tweets, scores, dataImages, 
  academiccategories, academicscores, titlescores
})

export default rootReducers