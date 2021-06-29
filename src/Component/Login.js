import React, { useState } from "react";
import PropTypes from "prop-types";
import { signin,signInWithGoogle } from "../actions/auth";
import { useSelector, connect, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
const Login = (props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  const data = useSelector((store) => store.firebaseReducer);
  // console.log(auth);
  if (data.auth.isEmpty === false&&data.profile.isEmpty===false) {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <form className="mt-10" onSubmit={(e) => onSubmit(e)}>
            <label
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              onChange={(e) => onChange(e)}
              required
            />

            <label
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              onChange={(e) => onChange(e)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <Link to="/forget-password" className="flex-2 underline">
                Forgot password?
              </Link>

              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>

              <Link to="/signup" className="flex-2 underline">
                Create an Account
              </Link>
            </div>
            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
             
               <button
                type="button"
                className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
                onClick={(e) => dispatch(signInWithGoogle())}
              >
                Sign In with Google 
              </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
