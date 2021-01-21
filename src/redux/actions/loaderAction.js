export function commaonLoader(value) {
  return (dispatch) => {
    dispatch({type: 'LOADER', value: value});
  };
}
