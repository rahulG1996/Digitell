const initialState = {
  saveLoanResponse: '',
  allLoanList: '',
};

const SaveLoanRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_LOAN_RESPONSE': {
      return {
        ...state,
        saveLoanResponse: action.value,
      };
    }
    case 'LOAN_DATA_LIST': {
      return {
        ...state,
        allLoanList: action.value,
      };
    }
    default:
      return state;
  }
};

export default SaveLoanRequestReducer;
