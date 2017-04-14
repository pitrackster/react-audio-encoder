import { combineReducers } from 'redux'
import files from './files'
import formats from './formats'

const reducers = combineReducers({
  files,
  formats
})

export default reducers
