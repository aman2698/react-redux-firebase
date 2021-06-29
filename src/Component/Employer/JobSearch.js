import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GetsAllJobs, apply,uploadResume,uploadCover } from "../../actions/job";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { State } from "../data";
const JobSearch = (props) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.loader);
  const data = useSelector((state) => state.jobs.job);
  const profile = useSelector(
    (state) => state.firebaseReducer.profile.appliedJob
  );
  const [state, setState] = useState();
  const [applyJob, setApplyJob] = useState(null);
  const [filterLocation, setFilterLocation] = useState({
    states: "",
    city: "",
  });
  const [district, setDistrict] = useState(null);
  const [formData, setFormData] = useState({
    resumeUrl : "",
    coverLetter:"",
    offerBudget:"",
    deliveryDate:"",
  })
  let {resumeUrl,coverLetter,offerBudget,deliveryDate} = formData
  const { states, city } = filterLocation;

  const options = [
    { label: "React", value: "React" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "HTML", value: "HTML" },
    { label: "Angular", value: "Angular" },
    { label: "Github", value: "Github" },
    { label: "AWS", value: "AWS" },
    { label: "Redux", value: "Redux" },
  ];

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch({ type: "SET_LOADER" });
    dispatch(GetsAllJobs());
  }, []);

  useEffect(() => {
    if (states) {
      let data = State.filter((e) => e.state === states);
      setDistrict(data[0].districts);
      // console.log(data[0].districts);
    }
  }, [states]);

  useEffect(() => {
    if (city && data) {
      let temp = data.filter((e) => e.city === city);
      setState(temp);
      console.log(state);
    }
    if (selected && data) {
      console.log(selected);
      let temp = data.filter((e) =>
        e.skills.find((skills) => skills.value === selected)
      );
      setState(temp);
    }
  }, [city, selected]);

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const handleResume = async (e) =>{
    let url = await dispatch(uploadResume(e.target.files[0]));
    setFormData({ ...formData, resumeUrl: url });
    console.log(url);
  }

  const handleCover = async (e) =>{
    let url = await dispatch(uploadCover(e.target.files[0]));
    setFormData({ ...formData, coverLetter: url });
    console.log(url);
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch({type:"SET_LOADER"})
   dispatch(apply(formData,applyJob));
   setApplyJob(null)
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
  const reset = () => {
    setState(data);
    setSelected(null);
    setFilterLocation({ ...filterLocation, city: "", state: "" });
  };
  return (
    <div className="container mx-auto bg-gray-50 min-h-screen p-8 antialiased">
      <div>
        <div className="grid grid-cols-4  gap-4">
          <div className="...">Filter</div>
          <div className="..."> Location -:</div>
          <div className="...">
            <select
              id="filterLocation"
              className="text-black-100"
              onChange={(f) =>
                setFilterLocation({
                  ...filterLocation,
                  states: document.getElementById("filterLocation").value,
                })
              }
            >
              <option>select state</option>
              {State.map((e) => (
                <option value={e.state} key={e.state}>
                  {e.state}
                </option>
              ))}
            </select>
          </div>
          <div className="...">
            <select
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              id="city"
              onChange={(e) =>
                setFilterLocation({
                  ...filterLocation,
                  city: document.getElementById("city").value,
                })
              }
            >
              <option>select state first</option>
              {district && district.map((e) => <option value={e}>{e}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4  gap-4">
          <div></div>
          <div>Skills-:</div>
          <div></div>
          <div>
            <select
              id="skill"
              onChange={(e) =>
                setSelected(document.getElementById("skill").value)
              }
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option>select skills</option>
              {options.map((e) => (
                <option value={e.value}>{e.value}</option>
              ))}
            </select>
            {/* <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              /> */}
          </div>
        </div>
        <div className="grid grid-cols-4  gap-4">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              onClick={(e) => reset()}
            >
              Reset
            </button>
          </div>
        </div>
        {state &&
          state.map((e) => {
            return (
              <div
                key={Math.floor(Math.random() * 1000000)}
                className="bg-gray-100 mx-auto border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-30"
              >
                <div
                  className={`flex p-3 border-l-8 ${
                    e.status === "ACTIVE" ? "border-blue-600" : "border-red-600"
                  }`}
                >
                  <div className="space-y-1 border-r-2 pr-3">
                    <div className="text-sm leading-5 font-semibold">
                      <span className="text-xs leading-4 font-normal text-gray-500">
                        {" "}
                        Id #
                      </span>{" "}
                      {e.id}
                    </div>

                    <div className="text-sm leading-5 font-semibold"></div>
                  </div>
                  <div className="flex-1">
                    <div className="ml-3 space-y-1 border-r-2 pr-3">
                      <div className="text-base leading-6 font-normal">
                        {e.jobTitle}
                      </div>
                      <div className="text-sm leading-4 font-normal">
                        <span className="text-xs leading-4 font-normal text-gray-500">
                          {" "}
                          Job Description
                        </span>{" "}
                        {e.jobDescription}
                      </div>
                      <div className="text-sm leading-4 font-normal">
                        <span className="text-xs leading-4 font-normal text-gray-500">
                          {" "}
                          Skills
                        </span>{" "}
                        {e.skills.map((f) => (
                          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {f.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-r-2 pr-3">
                    <div>
                      <div className="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                        <div className="uppercase text-xs leading-4 font-medium">
                          Location
                        </div>
                        <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                          {e.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className={`ml-3 my-5  p-1 w-20 
                       ${
                         profile && profile.find((f) => f === e.id.toString())
                           ? "bg-yellow-600"
                           : "bg-blue-600"
                       } 
                        `}
                    >
                      <div className="uppercase text-xs leading-4 font-semibold text-center text-black-100">
                        <button
                          id="status"
                          className="text-black-100"
                          // disabled={
                          //   profile.find((f) => f === e.id.toString())
                          //     ? true
                          //     : false
                          // }
                          // onClick={(f) => dispatch(apply(e.id))}
                          onClick={(f) => setApplyJob(e.id)}
                        >
                          {profile && profile.find((f) => f === e.id.toString())
                            ? "Applied"
                            : "Apply"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {applyJob && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Apply JOb</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setApplyJob(null)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  className="mt-7 "
                   onSubmit={(e) => onSubmit(e)}
                >
                  <div className="relative p-6 flex-auto">
                    <div className=" block gap-1  md:flex">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Upload Resume
                      </label>
                      <input
                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        type="file"
                        required
                        onChange={handleResume}
                      />
                    </div>
                    <div className=" block gap-1 mt-5  md:flex">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Cover Letter (Optional)
                      </label>
                      <input
                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        type="file"
                        onChange={handleCover}
                      />
                    </div>

                    <div className=" block gap-1 mt-5  md:flex">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                         Offer Budget
                      </label>
                      <input
                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        type="text"
                        name="offerBudget"
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className=" block gap-1 mt-5  md:flex">
                      <label className="text-sm font-bold text-gray-500 tracking-wide">
                         Delivery Date
                      </label>
                      <input
                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        type="date"
                        name="deliveryDate"
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => setApplyJob(null)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

JobSearch.propTypes = {};

export default JobSearch;
