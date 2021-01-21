const initialState = {
  isLoading: false,
};

const CommonLoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADER': {
      return {
        ...state,
        isLoading: action.value,
      };
    }
    default:
      return state;
  }
};

export default CommonLoaderReducer;
