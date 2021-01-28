const initialState = {
    profileData: false,
  };
  
  const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PROFILE_DATA': {
        return {
          ...state,
          profileData: action.value,
        };
      }
      default:
        return state;
    }
  };
  
  export default ProfileReducer;
  