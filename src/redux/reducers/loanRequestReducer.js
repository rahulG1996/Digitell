const initialState = {
    saveLoanResponse: '',
  };
  
  const SaveLoanRequestReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_LOAN_RESPONSE': {
        return {
          ...state,
          saveLoanResponse: action.value,
        };
      }
      default:
        return state;
    }
  };
  
  export default SaveLoanRequestReducer;
  