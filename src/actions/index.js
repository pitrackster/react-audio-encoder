


export const addFile = (files) => {

  return {
    type: 'ADD_FILES',
    files
  }
}

export const deleteFile = (id) => {
  return {
    type: 'DELETE_FILE',
    id
  }
}
