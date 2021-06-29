let initialState = {
    authentication: false,
    loading: true,
    role: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case "SET_ROLE":
        return {
          ...state,
          authentication: true,
          loading: false,
          role: payload,
          
        };
  
      case "LOGOUT":
        return {
          ...state,
          authentication: false,
          loading: false,
          role:null
        };
 
      default:
        return state;
    }
  }
  