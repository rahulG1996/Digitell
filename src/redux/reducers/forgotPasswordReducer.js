const initialState = {
  forgotPasswordResponse: '',
  resetPasswordResponse: '',
};

const ForgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORGOT_PASSWORD_DATA': {
      return {
        ...state,
        forgotPasswordResponse: action.value,
      };
    }
    case 'RESET_PASSWORD_DATA': {
      return {
        ...state,
        resetPasswordResponse: action.value,
      };
    }
    default:
      return state;
  }
};

export default ForgotPasswordReducer;
