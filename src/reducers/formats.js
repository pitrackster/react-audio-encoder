
const formats = (formats = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT':
      return Object.assign({}, formats, {
        current: action.format
      })


    default:
      return formats
  }
}


export default formats
