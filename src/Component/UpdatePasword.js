import React,{ useState} from 'react'
import PropTypes from 'prop-types'
import { updatePassword } from "../actions/auth";
import { useDispatch,useSelector, connect,  } from "react-redux";
import { Link } from "react-router-dom";
import { showSnack, dismissSnack } from "react-redux-snackbar";
import Loader from './Loader'

const UpdatePasword = props => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
const loader = useSelector(state => state.loader.loader)
    const { oldPassword, confirmPassword,newPassword} = formData;
    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      if (newPassword == confirmPassword) {
        dispatch({type:"SET_LOADER"})
       await dispatch(updatePassword(oldPassword, newPassword));
       

      } else {
        dispatch(
            showSnack("myUniqueId", {
              label: `password did not match`,
              timeout: 7000,
              button: { label: "OK, GOT IT" },
            })
          );
      
      }
      
    };

    if(loader){
      return(
        <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700 mt-40">
         
      <Loader/>

        </div>
      </div>
        </>
      )
    }
    return (
        <div>
             <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
              px-6 py-10 sm:px-10 sm:py-6 
              bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Update Password
          </h2>

          <form className="mt-10" onSubmit={(e) => onSubmit(e)}>
           
            <input
              id="password"
              type="password"
              placeholder="Old password"
              name="oldPassword"
              className="block w-full py-3 px-1 mt-2 
                      text-gray-800 appearance-none 
                      border-b-2 border-gray-800
                      focus:text-gray-500 focus:outline-none focus:border-gray-200"
              onChange={(e) => onChange(e)}
              required
            />

            <input
              id="password"
              type="password"
              name="newPassword"
              placeholder="New password"
              className="block w-full py-3 px-1 mt-2 
                      text-gray-800 appearance-none 
                      border-b-2 border-gray-800
                      focus:text-gray-500 focus:outline-none focus:border-gray-200"
              onChange={(e) => onChange(e)}
              required
            />

            <input
              id="password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="block w-full py-3 px-1 mt-2 
                      text-gray-800 appearance-none 
                      border-b-2 border-gray-800
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
              Update
            </button>

           
          </form>
        </div>
      </div>
    </div>
        </div>
    )
}

UpdatePasword.propTypes = {

}

export default UpdatePasword
