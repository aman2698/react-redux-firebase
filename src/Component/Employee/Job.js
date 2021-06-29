import React,{ useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {GetJobById} from '../../actions/job'
import {
    useParams,
  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";

const Job = props => {
    let { id } = useParams();
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader)

    useEffect(async() => {
        dispatch({type:"SET_LOADER"})
       await dispatch(GetJobById(id))
    }, [])
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
            hello
        </div>
    )
}

Job.propTypes = {

}

export default Job
