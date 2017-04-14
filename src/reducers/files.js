let nextFileId = 0


const files = (files = [], action) => {
  switch (action.type) {
    case 'ADD_FILES': {
      const added = []
      Object.keys(action.files).forEach(index => {
        const file = action.files[index]
        added.push({
          id: nextFileId++,
          name: file.name,
          file: file
        })
      })
      return files.concat(added)
    }
    case 'DELETE_FILE': {
      return files.filter(file => file.id !== action.id)
    }
    default:
      return files
  }
}

export default files
