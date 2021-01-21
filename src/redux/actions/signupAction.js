import {NoAuthAPI} from '../../services/FetchApi';

export function doSignup(data) {
  return async (dispatch) => {
    let signupData = await NoAuthAPI('signup', 'POST', data);
    if (!signupData) {
      dispatch({type: 'ERROR', value: false});
      dispatch({type: 'LOADER', value: false});
    } else {
      dispatch({type: 'SIGNUP', value: signupData});
      dispatch({type: 'LOADER', value: false});
    }
  };
}
