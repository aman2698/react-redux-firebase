import { useState, useEffect } from "react";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import Main from "./Component/Main";
import Landing from "./Component/Landing";
import DashBoard from "./Component/Employee/DashBoard";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ForgetPassword from "./Component/ForgetPassword";
import { Snackbar } from "react-redux-snackbar";
import EmailSignin from "./Component/EmailSignin";
import { isLoaded } from "react-redux-firebase";
import Loader from './Component/Loader'
function App() {
  const auth = useSelector((state) => state.firebaseReducer.profile);
  console.log(auth);
  //  if(auth.pr.isEmpty ===false){
  //  return <Redirect to="/dashboard"/>
  //  }
  // useEffect(() => {
  //   if(auth.profile.isEmpty ===false){
  //    return <Redirect to="/"/>
  //    }
  // }, [auth.profile.isEmpty])
  if (!isLoaded(auth))
    return (
      <div class="flex items-center justify-center w-full h-full">
        <div class="flex justify-center items-center space-x-1 text-sm text-gray-700 mt-40">
         
      <Loader/>

        </div>
      </div>
    );
    
  return (
    <div className="">
      <Snackbar />
      
      
      <Switch>
      {auth.isEmpty === true && (
        <Route exact path="/">
          <Landing />
        </Route>
      )}
      {auth.isEmpty === false && (
        <Route exact path="/">
          <Main />
        </Route>
      )}
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        {/* <Route exact path="/dashboard">
          <DashBoard />
        </Route> */}
        <Route exact path="/forget-password">
          <ForgetPassword />
        </Route>
        <Route exact path="/email-signup">
          <EmailSignin />
        </Route>
       
        {auth.isEmpty === true &&  <Route path="*">
        <Redirect to="/login" />
    </Route>}
    <Route path="*">
                  <Main />
                </Route>
      </Switch>
    </div>
  );
}

export default App;
