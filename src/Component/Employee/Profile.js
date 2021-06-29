import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, connect, useDispatch } from "react-redux";
import {
  companyProfile,
  uploadPic,
  getProfilePic,
} from "../../actions/profile";
import Loader from "../Loader";

const Profile = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.firebaseReducer);
  const loader = useSelector((state) => state.loader.loader);

  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyLocation: "",
    imageUrl: "",
  });

  let { companyName, companyAddress, companyLocation, imageUrl } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADER" });
    dispatch(companyProfile(companyName, companyAddress, companyLocation));
  };
  useEffect(() => {
    if (data.profile.isProfile === true) {
      setFormData({
        ...formData,
        companyName: data.profile.companyName ? data.profile.companyName : "",
        companyAddress: data.profile.companyAddress
          ? data.profile.companyAddress
          : "",
        companyLocation: data.profile.companyLocation
          ? data.profile.companyLocation
          : "",
        imageUrl: data.profile.imgUrl ? data.profile.imgUrl : "",
      });
    }
  }, [data.profile]);

  const handleImage = async (e) => {
    let url = await dispatch(uploadPic(e.target.files[0]));
    setFormData({ ...formData, imageUrl: url });
    console.log(url);
    console.log(imageUrl);
  };

  if (loader) {
    return (
      <>
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex justify-center items-center space-x-1 text-sm text-gray-700 mt-40">
            <Loader />
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="flex h-screen bg-gray-200 items-center justify-center  mt-5 mb-32">
        <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                Profile
              </h1>
            </div>
          </div>
          <div className="flex justify-center py-4">
            {imageUrl && (
              <img
                className="inline object-cover w-16 h-16 mr-2 rounded-full"
                src={imageUrl}
                alt="Profile image"
              />
            )}
          </div>
          <div className="flex justify-center py-4">
            <label className="cursor-pointer ">
              <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                Browse
              </span>
              <input type="file" className="hidden" onChange={handleImage} />
            </label>
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="grid grid-cols-1 mt-5 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Company Name
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="companyName"
                value={companyName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="grid grid-cols-1 mt-3 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Company Address
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="companyAddress"
                value={companyAddress}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="grid grid-cols-1 mt-3 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Company Location
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="companyLocation"
                value={companyLocation}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
              <button
                type="submit"
                className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
