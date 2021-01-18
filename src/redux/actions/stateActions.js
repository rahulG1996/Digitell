import {NoAuthAPI} from '../../services/FetchApi';

export function getStates() {
  return (dispatch = async (dispatch) => {
    let getAllStates = await NoAuthAPI('get_state', 'GET');
    dispatch({type: 'STATES', value: getAllStates});
  });
}
