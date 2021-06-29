import React from "react";
import PropTypes from "prop-types";
import { Link,Redirect } from "react-router-dom";
import { useSelector} from "react-redux";

const Landing = (props) => {
    
//     const auth = useSelector((store) => store.auth.authentication);
//   console.log(auth);
//   if (auth === true) {
//     return <Redirect to="/" />;
//   }
  return (
    <header className="bg-white dark:bg-gray-800">
      <nav className="bg-white dark:bg-gray-800">
        <div className="container p-6 mx-auto">
          <a
            className="block text-2xl font-bold text-center text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
            href="#"
          >
            Job Portal
          </a>

          <div className="flex items-center justify-center mt-6 text-gray-600 capitalize dark:text-gray-300">
            <a
              href="#"
              className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
            >
              home
            </a>

            <a
              href="#"
              className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              features
            </a>

            <Link to="/signup"
              className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              SignUp
            </Link >

            <Link to="/login"
              className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              Login
            </Link>

         

           
          </div>
        </div>
      </nav>

      <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
        <div className="flex flex-col items-center w-full md:flex-row md:w-1/2">
          <div className="max-w-lg md:mx-12 md:order-2">
            <h1 className="text-3xl font-medium tracking-wide text-gray-800 dark:text-white md:text-4xl">
              We're here to help
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Post your job, interview candidates, and make offers—all on
              Indeed. Start hiring today
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md md:inline hover:bg-blue-400"
              >
                Download from App Store
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 md:w-1/2">
          <img
            className="object-cover w-full h-full max-w-2xl rounded-md"
            src="https://images.financialexpress.com/2020/01/jobs-7.jpg"
            alt="apple watch photo"
          />
        </div>
      </div>
    </header>
  );
};

Landing.propTypes = {};

export default Landing;
