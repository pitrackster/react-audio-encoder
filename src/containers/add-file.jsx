import React, {PropTypes as T} from 'react'
import { connect } from 'react-redux'
import { addFile } from '../actions'

let AddFile = ({ dispatch }) => {

  return (
    <input type="file" id="input" multiple onChange={(e) => dispatch(addFile(e.target.files))} />
  )
}
AddFile = connect()(AddFile)



export default AddFile
