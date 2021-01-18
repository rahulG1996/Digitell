import {baseUrl} from './apiServices';

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
  // if (navigator.onLine) {
  var init =
    apiMethod == 'GET'
      ? {
          method: 'GET',

          //   headers: {
          //     //'Authorization': token,
          //     //"Content-Type": 'application/json',
          //     Accept: 'application/json',
          //   },
        }
      : apiMethod == 'POST'
      ? {
          method: apiMethod,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      : {
          method: apiMethod,
          headers: {
            //'Authorization': token,
            //'Content-Type': "multipart/form-data",
            Accept: 'application/json',
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
      return {message: ' Server encountered a problem please retry ! '};
    });
};

export {AuthAPI, NoAuthAPI};
