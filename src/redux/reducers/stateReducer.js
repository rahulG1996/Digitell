const initialState = {
  allStates: '',
  allCities: '',
};

const StateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STATES': {
      return {
        ...state,
        allStates: action.value,
      };
    }

    case 'CITIES': {
      console.warn('redux', action.value);
      return {
        ...state,
        allCities: action.value,
      };
    }

    default:
      return state;
  }
};

export default StateReducer;
