import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, connect, useDispatch } from "react-redux";
import { createProfile, uploadPic, uploadResume } from "../../actions/profile";
import Loader from '../Loader';
const Profile = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.firebaseReducer);
const loader = useSelector(state => state.loader.loader)

  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    mobile: "",
    location: "",
    imageUrl: "",
    resumeUrl: "",
    state: "",
    city: "",
    address: "",
  });

  let {
    name,
    DOB,
    mobile,
    location,
    imageUrl,
    resumeUrl,
    state,
    city,
    address,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({type:"SET_LOADER"})
    dispatch(createProfile(name, mobile, location, state, city, address, DOB));
  };
  useEffect(() => {
    if (data.profile.isProfile === true) {
      setFormData({
        ...formData,
        email: data.profile.email,
        name: data.profile.name ? data.profile.name : "",
        mobile: data.profile.mobile ? data.profile.mobile : "",
        location: data.profile.location ? data.profile.location : "",
        imageUrl: data.profile.imgUrl ? data.profile.imgUrl : "",
        resumeUrl: data.profile.resumeUrl ? data.profile.resumeUrl : "",
        DOB: data.profile.DOB ? data.profile.DOB : "",
        state: data.profile.state ? data.profile.state : "",
        city: data.profile.city ? data.profile.city : "",
        address: data.profile.address ? data.profile.address : "",
      });
    }
  }, [data.profile]);
  const handleImage = async (e) => {
    console.log("success");
    let url = await dispatch(uploadPic(e.target.files[0]));
    setFormData({ ...formData, imageUrl: url });
    console.log(url);
    console.log(imageUrl);
  };
  // const handleResume = async (e) => {
  //   let url = await dispatch(uploadResume(e.target.files[0]));
  //   setFormData({ ...formData, resumeUrl: url });
  //   console.log(url);
  // };
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
            { (
              <img
                className="inline object-cover w-16 h-16 mr-2 rounded-full"
                src={imageUrl &&imageUrl}
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
                Full Name
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="name"
                value={name}
                minlength="4"
                maxlength="20"
                required
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Date of Birth
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="date"
                  name="DOB"
                  value={DOB}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Mobile
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  minlength="10"
                  value={mobile}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  State
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  City
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-3 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Address
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="address"
                value={address}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="grid grid-cols-1 mt-3 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Location
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                placeholder="Location"
                name="location"
                value={location}
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
