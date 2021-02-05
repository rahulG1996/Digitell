import {NoAuthAPI} from '../../services/FetchApi';

export function sentPaymentRequest(data) {
  return async (dispatch) => {
    let paymentResponse = await NoAuthAPI('payment_request', 'POST', data);
    if (!paymentResponse) {
      dispatch({type: 'ERROR', value: false});
      dispatch({type: 'LOADER', value: false});
    } else {
      dispatch({type: 'SEND_PAYMENT_RESPONSE', value: paymentResponse});
      dispatch({type: 'LOADER', value: false});
    }
  };
}