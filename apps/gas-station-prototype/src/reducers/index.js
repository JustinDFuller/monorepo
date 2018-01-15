export default (state = {}, action) => {
  console.log(action.type, action);
  switch(action.type) {
    case 'SELECT OPTION':
      return {
        ...state,
        option: action.option, 
      }
    
    default:
      return state;
  }
}