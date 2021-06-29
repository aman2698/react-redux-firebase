import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, connect, useDispatch } from "react-redux";
import { jobPost } from "../../actions/job";
import MultiSelect from "react-multi-select-component";
import {State} from '../data';
import Loader from "../Loader";

const PostJob = (props) => {
  const dispatch = useDispatch();
  const [district, setDistrict] = useState(null)
  const data = useSelector((state) => state.firebaseReducer);
  const loader = useSelector((state) => state.loader.loader);

  const options = [
    { label: "React", value: "React" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "HTML", value: "HTML"},
    { label: "Angular", value: "Angular" },
    { label: "Github", value: "Github" },
    { label: "AWS", value: "AWS" },
    { label: "Redux", value: "Redux" },
  ];
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    aboutJob: "",
    jobDescription: "",
    budget: "",
    status: "",
    location: "",
    type: "",
    city: "",
  });
  let {
    aboutJob,
    jobDescription,
    budget,
    status,
    location,
    city
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData,selected);
    dispatch({ type: "SET_LOADER" });
    await dispatch(jobPost(formData,selected));
  };
  useEffect(() => {
   if(location){
     let data = State.filter(e => e.state === location)
     setDistrict(data[0].districts)
     console.log(data[0].districts);
   }
  }, [location])
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
    <>
      <div className="flex h-screen bg-gray-200 items-center justify-center  mt-5 mb-32">
        <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                Create Job
              </h1>
            </div>
          </div>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="grid grid-cols-1 mt-5 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Job Title
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                name="aboutJob"
                value={aboutJob}
                onChange={(e) => onChange(e)}
              />
            </div>
           

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  job Description
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  name="jobDescription"
                  //   value={}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Budget
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  placeholder="budget"
                  name="budget"
                  //   value={}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Location
              </label>
              <select
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                id="state"
                onChange={(e) => setFormData({...formData,location:document.getElementById("state").value})}
              >
                <option>select state</option>
                {State.map( e => <option value={e.state}>{e.state}</option>)}
              </select>
              </div>
              <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                City
              </label>
              <select
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                id="city"
                // value={location}
                onChange={(e) =>setFormData({...formData,city: document.getElementById("city").value})}
                
              >
                <option>select state first</option>
                {district && district.map( e => <option value={e}>{e}</option>)}
              </select>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-3 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Fixed or Milestone
              </label>
              <select
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="type"
                
                onChange={(e) => setFormData({...formData, type : document.getElementById("type").value})}
              >
                <option>select the job type</option>
                <option value="FIXED">Fixed</option>
                <option value="MILESTONE">Milestone</option>
              </select>
            </div>
            <div className="grid grid-cols-1 mt-3 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Skills
              </label>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </div>
            <div className="grid grid-cols-1 mt-3 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Status
              </label>
              <select id="status" onChange={e => setFormData({...formData,status:document.getElementById("status").value})}>
                <option >select</option>
                <option value="ACTIVE">Active</option>
                <option value="STOP">Stop</option>
              </select>
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
    </>
  );
};

PostJob.propTypes = {};

export default PostJob;
