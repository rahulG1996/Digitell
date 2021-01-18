const initialState = {
  allStates: '',
};

const StateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STATES': {
      console.warn('redux', action.value);
      return {
        ...state,
        allStates: action.value,
      };
    }

    default:
      return state;
  }
};

export default StateReducer;
