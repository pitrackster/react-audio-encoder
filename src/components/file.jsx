import React, { PropTypes as T } from 'react'

const File = ({ id, name, onDelete}) => (
  <li>
    {name}
    <button onClick={() => onDelete(id)}>DELETE</button>
  </li>
)

File.propTypes = {
  id: T.number.isRequired,
  file: T.object.isRequired,
  name: T.string,
  onDelete: T.func.isRequired
}

export default File
