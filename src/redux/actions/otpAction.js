export function sentOtp(mobileNumber) {
  return (dispatch) => {
    fetch(
      `http://2factor.in/API/V1/7a2fed00-443a-11eb-8153-0200cd936042/SMS/${mobileNumber}/AUTOGEN/Digitell`,
    )
      .then((response) =>
        response.json().then((responseData) => {
          alert(responseData);
        }),
      )
      .catch((err) => {
        alert(err);
      });
  };
}
