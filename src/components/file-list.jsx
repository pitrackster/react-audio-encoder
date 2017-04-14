import React, { PropTypes as T } from 'react'
import File from './file.jsx'

const FileList = ({ files, handleFileDelete }) => {
  return (
    <ul>
      {files.map(file =>
        <File
          key={file.id}
          {...file}
          onDelete={() => handleFileDelete(file.id)}
        />
      )}
    </ul>
  )
}

FileList.propTypes = {
  files: T.arrayOf(T.shape({
    id: T.number.isRequired,
    name: T.string.isRequired,
    file: T.object
  })).isRequired,
  handleFileDelete: T.func.isRequired
}

export default FileList
