import {NoAuthAPI} from '../../services/FetchApi';

export function applyLoan(data) {
  return async (dispatch) => {
    let loanRequestData = await NoAuthAPI('save_loan_request', 'POST', data);
    console.warn('loanRequestData', loanRequestData);
    if (!loanRequestData) {
      // dispatch({type: 'ERROR', value: false});
      dispatch({type: 'LOADER', value: false});
    } else {
      dispatch({type: 'SAVE_LOAN_RESPONSE', value: loanRequestData});
      dispatch({type: 'LOADER', value: false});
    }
  };
}

export function emptyApplyLoanData() {
  return (dispatch) => {
    dispatch({type: 'SAVE_LOAN_RESPONSE', value: ''});
  };
}
