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
