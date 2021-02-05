import {NoAuthAPI} from '../../services/FetchApi';

export function getProfile(id) {
  return async (dispatch) => {
    let profileData = await NoAuthAPI(
      `get_customer_details?customer_id=${id}`,
      'GET',
    );
    if (!profileData) {
      dispatch({type: 'ERROR', value: false});
      dispatch({type: 'LOADER', value: false});
    } else {
      dispatch({type: 'PROFILE_DATA', value: profileData});
      dispatch({type: 'LOADER', value: false});
    }
  };
}

export function updateData(data) {
  return async (dispatch) => {
    let updateProfileData = await NoAuthAPI('update_profile', 'POST', data);
    if (!updateProfileData) {
      dispatch({type: 'ERROR', value: false});
      dispatch({type: 'LOADER', value: false});
    } else {
      dispatch({type: 'UPDATE_PROFILE_DATA', value: updateProfileData});
      dispatch({type: 'LOADER', value: false});
    }
  };
}

export function emptyUpdateProfileData() {
  return (dispatch) => {
    dispatch({type: 'UPDATE_PROFILE_DATA', value: ''});
  };
}
