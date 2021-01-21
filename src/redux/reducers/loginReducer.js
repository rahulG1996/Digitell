const initialState = {
  loginResponse: '',
  userToken: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        loginResponse: action.value,
      };
    }

    case 'USER_TOKEN': {
      return {
        ...state,
        userToken: action.value,
      };
    }

    default:
      return state;
  }
};

export default LoginReducer;
