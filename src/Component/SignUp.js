import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  signup,
  signUpWithGoogleEmployee,
  signUpWithGoogleEmployer,
  facebookSignUpForEmployee,
  facebookSignUpForEmployer
} from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link,withRouter } from "react-router-dom";

const SignUp = ({history}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { name, email, role } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(signup(email, name, role));
  };

  const data = useSelector((store) => store.firebaseReducer);
  // console.log(auth);
  if (data.auth.isEmpty === false && data.profile.isEmpty === false) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              onChange={(e) => onChange(e)}
              placeholder="Full Name"
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              onChange={(e) => onChange(e)}
              placeholder="Email"
            />

            <select
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="role"
              id="role"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: document.getElementById("role").value,
                })
              }
            >
              <option value="EMPLOYER">Employer</option>
              <option value="EMPLOYEE">Employee</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Create Account
            </button>
          </form>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            to="login"
            className="no-underline border-b border-blue text-blue"
          >
            Log in
          </Link>
          <button
            className="bg-red-500 hover:bg-red-600 w-1/2 py-2 text-white "
            onClick={(e) => dispatch(signUpWithGoogleEmployer(history))}
          >
            Sign In with Google for Employer
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 w-1/2 py-2 text-white"
            onClick={(e) => dispatch(signUpWithGoogleEmployee(history))}
          >
            Sign In with Google for Employee
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 w-1/2 py-2 text-white "
            onClick={(e) => dispatch(facebookSignUpForEmployer(history))}
          >
            Sign In with facebook for Employer
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 w-1/2 py-2 text-white"
            onClick={(e) => dispatch(facebookSignUpForEmployee(history))}
          >
            Sign In with facebook for Employee
          </button>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {};

export default withRouter(SignUp);
