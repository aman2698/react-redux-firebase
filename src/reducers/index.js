import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { snackbarReducer } from "react-redux-snackbar";
import auth from "./auth";
import jobs from "./jobs";
import loader from "./loader";
export default combineReducers({
  firebaseReducer,
  firestoreReducer,
  auth,
  jobs,
  snackbar: snackbarReducer,
  loader
});
