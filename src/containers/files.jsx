import { connect } from 'react-redux'
import { deleteFile } from '../actions'
import FileList from '../components/file-list.jsx'



const mapStateToProps = (state) => {
  return {
    files: state.files
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFileDelete: (id) => {
      dispatch(deleteFile(id))
    }
  }
}

const Files = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList)

export default Files
