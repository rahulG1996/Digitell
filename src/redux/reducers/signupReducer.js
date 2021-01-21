const initialState = {
  signupResponse: '',
};

const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP': {
      console.warn('redux', action.value);
      return {
        ...state,
        signupResponse: action.value,
      };
    }

    default:
      return state;
  }
};

export default SignupReducer;
