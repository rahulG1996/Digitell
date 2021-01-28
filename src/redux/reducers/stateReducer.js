const initialState = {
  allStates: '',
  allCities: '',
  allOccupation: '',
  allLoanTypes : ''
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
      return {
        ...state,
        allCities: action.value,
      };
    }
    case 'OCCUPATION_DATA': {
      return {
        ...state,
        allOccupation: action.value,
      };
    }
    case 'LOAN_TYPE': {
      return {
        ...state,
        allLoanTypes: action.value,
      };
    }
    default:
      return state;
  }
};

export default StateReducer;
