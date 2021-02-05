const initialState = {
  isLoading: false,
  paymentRequestResponse: '',
};

const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_PAYMENT_RESPONSE': {
      return {
        ...state,
        paymentRequestResponse: action.value,
      };
    }
    default:
      return state;
  }
};

export default PaymentReducer;
