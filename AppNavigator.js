import React from 'react'
import { StackNavigator } from 'react-navigation'
import SplashContainer from './app/containers/SplashContainer'
import ComponentContainer from './app/containers/ComponentContainer'
import LoginContainer from './app/containers/LoginContainer'
import EditProfileContainer from './app/containers/EditProfileContainer'
import ChangePasswordContainer from './app/containers/ChangePasswordContainer'
import ReportBugContainer from './app/containers/ReportBugContainer'
import CalendarContainer from './app/containers/CalendarContainer'
import PostContainer from './app/containers/PostContainer'
import EventContainer from './app/containers/EventContainer'
import CreatePostContainer from './app/containers/CreatePostContainer'
import DocumentListContainer from './app/containers/DocumentListContainer'
import DocumentSectionContainer from './app/containers/DocumentSectionContainer'
import DocumentViewerContainer from './app/containers/DocumentViewerContainer'
import TimelineContainer from './app/containers/TimelineContainer'
import RegisterContainer from "./app/containers/RegisterContainer"
import AnnouncementContainer from "./app/containers/AnnouncementContainer"

const AppNavigator = StackNavigator({
  Splash: {screen: SplashContainer},
  ComponentPage: {screen: ComponentContainer},
  Login: {screen: LoginContainer},
  Register: {screen: RegisterContainer},
  EditProfile: {screen: EditProfileContainer},
  ChangePassword: {screen: ChangePasswordContainer},
  Timeline: {screen: TimelineContainer},
  ReportBug: {screen: ReportBugContainer},
  Calendar: {screen: CalendarContainer},
  Post: {screen: PostContainer},
  CreatePost: {screen: CreatePostContainer},
  Event: {screen: EventContainer},
  Announcement: {screen: AnnouncementContainer},
  DocumentList: {screen: DocumentListContainer},
  DocumentSection: {screen: DocumentSectionContainer},
  DocumentViewer: {screen: DocumentViewerContainer}
}, {
  headerMode: 'none'
})

export default AppNavigator