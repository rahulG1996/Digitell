import {NoAuthAPI} from '../../services/FetchApi';

export function getStates() {
  return (dispatch = async (dispatch) => {
    let getAllStates = await NoAuthAPI('get_state', 'GET');
    dispatch({type: 'STATES', value: getAllStates});
  });
}

export function getCities(id) {
  return (dispatch = async (dispatch) => {
    let getAllCities = await NoAuthAPI(`get_district/${id}`, 'GET');
    dispatch({type: 'CITIES', value: getAllCities});
  });
}

export function getOccupation() {
  return async (dispatch) => {
    let occupationData = await NoAuthAPI('get_occupation', 'GET');
    dispatch({type: 'OCCUPATION_DATA', value: occupationData});
  };
}

export function getLoantypes() {
  return async (dispatch) => {
    let loanTypes = await NoAuthAPI('get_loan_type', 'GET');
    dispatch({type: 'LOAN_TYPE', value: loanTypes});
  };
}
