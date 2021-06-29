import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
const ShowCandidate = ({location}) => {
    console.log(JSON.parse(location.state));
    return (
        <>
            <div class="min-h-screen bg-gray-200 flex justify-center items-center">
   <div class="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
      <div id="header" class="flex"> 
         <img alt="mountain" class="w-45 rounded-md border-2 border-gray-300" src="https://picsum.photos/seed/picsum/200" />
         <div id="body" class="flex flex-col ml-5">
            <h4 id="name" class="text-xl font-semibold mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
            <p id="job" class="text-gray-800 mt-2">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div class="flex mt-5">
               <img alt="avatar" class="w-6 rounded-full border-2 border-gray-300" src="https://picsum.photos/seed/picsum/200" />
               <p class="ml-3">John Doe</p>
            </div>
         </div>
      </div>
   </div>
</div>
        </>
    )
}

ShowCandidate.propTypes = {

}

export default withRouter(ShowCandidate)
