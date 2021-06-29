import React, { useState, useEffect } from "react";
import firebase from "../firebase";

import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import DashBoard from "./Employee/DashBoard";
import EmployerDashboard from "./Employer/EmployerDashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import Landing from "./Landing";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { isLoaded } from "react-redux-firebase";

const Main = ({ state }) => {
  //  const [show,setShow] = useState(false);

  useEffect(async () => {
   await firebase.auth().onAuthStateChanged();
  }, []);
  const auth = useSelector((state) => state.firebaseReducer.profile);
  // console.log(auth, state.firebaseReducer.profile);

  // if (!isLoaded(auth)) return <div>splash screen...</div>;
  if (
    state.firebaseReducer.auth.isEmpty === false &&
    state.firebaseReducer.profile.isEmpty === false
  ) {
    if (state.firebaseReducer.profile.role === "EMPLOYER") {
      return (
        <div>
          {" "}
         
          <EmployerDashboard />
        </div>
      );
    } else if (state.firebaseReducer.profile.role === "EMPLOYEE") {
      return (
        <div>
          {" "}
          <DashBoard />
        </div>
      );
    } else {
      return <Redirect to="/"/>;
    }
  } else {
    return <Redirect to="/"/>;
  }
};

Main.propTypes = {};
const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps)(Main);
