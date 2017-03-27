const selected = (state = '', action) => {
  switch(action.type) {
    case 'SELECT_DAY':
      return action.payload
    default:
      return state
  }
}

export default selected
