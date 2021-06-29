import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { allJob, updateStatus, deleteJob } from "../../actions/job";
import { useSelector, connect, useDispatch } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { State } from "../data";
import MultiSelect from "react-multi-select-component";

const GetAllJobs = (props) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.loader);
  let data = useSelector((state) => state.jobs.job);
  const [district, setDistrict] = useState(null);
  const [state, setState] = useState();
  const [filterLocation, setFilterLocation] = useState({
    states: "",
    city: "",
  });
  const [active, setActive] = useState({
    id: "",
    status: "",
  });
  const { id, status } = active;
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

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch({ type: "SET_LOADER" });
    dispatch(allJob());
  }, []);

  useEffect(() => {
    if (id !== "" && status !== "") {
      dispatch(updateStatus(id, status));
      setActive({ ...active, id: "", status: "" });
    }
  }, [active]);

  useEffect(() => {
    if (states) {
      let data = State.filter((e) => e.state === states);
      setDistrict(data[0].districts);
      // console.log(data[0].districts);
    }
  }, [states]);
  useEffect(() => {
    if (city && state) {
      let temp = state.filter((e) => e.city === city);
      setState(temp);
      //  console.log(state);
    }
    if (selected && state) {
      console.log(selected);
      let temp = state.filter((e) =>
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
    <div className="container mx-auto bg-gray-50 min-h-screen p-8 ant     ialiased">
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
              value={selected}
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

                    <div className="text-sm leading-5 font-semibold">
                      <Moment format="YYYY/MM/DD">
                        {new Date(e.createdAt)}
                      </Moment>
                    </div>
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
                          <span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {f.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-r-2 pr-3">
                    <div>
                      <Link
                        to={{
                          pathname: `/job/${e.id}`,
                          state: JSON.stringify(e),
                        }}
                      >
                        <div className="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                          <div className="uppercase text-xs leading-4 font-medium">
                            Candidate
                          </div>
                          <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                            {e.appliedCandidate && e.appliedCandidate.length > 0
                              ? e.appliedCandidate.length
                              : "0"}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div
                      className={`ml-3 my-5  p-1 w-20 ${
                        e.status === "ACTIVE" ? "bg-blue-600" : "bg-red-600"
                      }`}
                    >
                      <div className="uppercase text-xs leading-4 font-semibold text-center text-black-100">
                        <select
                          id="status"
                          className="text-black-100"
                          onChange={(f) =>
                            setActive({
                              ...active,
                              id: e.id,
                              status: document.getElementById("status").value,
                            })
                          }
                        >
                          {e.status === "STOP" ? (
                            <>
                              <option value="STOP" selected>
                                Stop
                              </option>
                              <option value="ACTIVE">Active</option>
                            </>
                          ) : (
                            <>
                              <option value="STOP">Stop</option>
                              <option value="ACTIVE" selected>
                                Active
                              </option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500"
                      onClick={(f) => dispatch(deleteJob(e.id))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

GetAllJobs.propTypes = {};

export default GetAllJobs;
