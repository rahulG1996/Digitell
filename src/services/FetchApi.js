import {baseUrl} from './apiServices';
import {ToastMessage} from '../components/ToastMessage';

var AuthAPI = (apiName, apiMethod, token, data) => {
  var init =
    apiMethod == 'GET'
      ? {
          method: 'GET',

          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      : apiMethod == 'POST'
      ? {
          method: apiMethod,
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      : {
          method: apiMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(data),
        };
  return fetch(baseUrl + apiName, init)
    .then((response) =>
      response.json().then((responseData) => {
        return responseData;
      }),
    )
    .catch((err) => {
      return {message: 'Server encountered a problem please retry.'};
    });
};

var NoAuthAPI = (apiName, apiMethod, data) => {
  let formBody = new FormData();
  for (let i in data) {
    formBody.append(i, data[i]);
  }
  console.warn('body--->', JSON.stringify(formBody, undefined, 2));
  var init =
    apiMethod == 'GET'
      ? {
          method: 'GET',
        }
      : apiMethod == 'POST'
      ? {
          method: apiMethod,
          body: formBody,
        }
      : {
          method: apiMethod,
          headers: {
            Accept: 'application/json',
          },
          body: formBody,
        };
  return fetch(baseUrl + apiName, init)
    .then((response) =>
      response.json().then((responseData) => {
        console.warn('res', responseData);
        return responseData;
      }),
    )
    .catch((err) => {
      console.warn('error', err);
      // setTimeout(() => {
      //   ToastMessage('Server encounter an error, please try after some time');
      // }, 400);
      return false;
    });
};

export {AuthAPI, NoAuthAPI};
