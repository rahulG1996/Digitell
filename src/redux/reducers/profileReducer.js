const initialState = {
  profileData: false,
  updateProfileResponse: '',
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_DATA': {
      return {
        ...state,
        profileData: action.value,
      };
    }
    case 'UPDATE_PROFILE_DATA': {
      return {
        ...state,
        updateProfileResponse: action.value,
      };
    }
    default:
      return state;
  }
};

export default ProfileReducer;
