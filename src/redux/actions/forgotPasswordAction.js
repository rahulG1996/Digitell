import {NoAuthAPI} from '../../services/FetchApi';

export function forgotPassword(data) {
  return async (dispatch) => {
    let forgotPasswordData = await NoAuthAPI('forgot_password', 'POST', data);
    if (!forgotPasswordData) {
      dispatch({type: 'ERROR', value: false});
      dispatch({type: 'LOADER', value: false});
    } else {
      dispatch({type: 'FORGOT_PASSWORD_DATA', value: forgotPasswordData});
      dispatch({type: 'LOADER', value: false});
    }
  };
}

export function emptyForgotPasswordData() {
  return (dispatch) => {
    dispatch({type: 'FORGOT_PASSWORD_DATA', value: ''});
  };
}

export function resetpassword(data) {
    return async (dispatch) => {
      let resetPasswordData = await NoAuthAPI('update_password', 'POST', data);
      if (!resetPasswordData) {
        dispatch({type: 'ERROR', value: false});
        dispatch({type: 'LOADER', value: false});
      } else {
        dispatch({type: 'RESET_PASSWORD_DATA', value: resetPasswordData});
        dispatch({type: 'LOADER', value: false});
      }
    };
  }

  export function emptyResetPasswordData() {
    return (dispatch) => {
      dispatch({type: 'RESET_PASSWORD_DATA', value: ''});
    };
  }
