let initialState = {
    job:[],
    JobById:null
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case "SET_JOB":
        return {
          ...state,
         job:payload
          
        };
        case "GET_JOB_BY_ID":
        return {
          ...state,
          JobById:payload
          
        };
 
      default:
        return state;
    }
  }
  