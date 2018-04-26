import { reactotronRedux } from 'reactotron-redux'
import Reactotron from 'reactotron-react-native'

Reactotron.configure({ name: 'Sespim' })
  .useReactNative()
  .use(reactotronRedux())
  .connect()
