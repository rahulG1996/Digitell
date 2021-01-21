import {NoAuthAPI} from '../../services/FetchApi';

export function doLogin(data) {
  return async (dispatch) => {
    let loginData = await NoAuthAPI('do_login', 'POST', data);
    if (!loginData) {
      dispatch({type: 'ERROR', value: false});
      dispatch({type: 'LOADER', value: false});
    } else {
      dispatch({type: 'LOGIN', value: loginData});
      dispatch({type: 'LOADER', value: false});
    }
  };
}

export function emptyLoginData() {
  return (dispatch) => {
    dispatch({type: 'LOGIN', value: ''});
  };
}

export function setToken(value) {
  return (dispatch) => {
    dispatch({type: 'USER_TOKEN', value: value});
  };
}
