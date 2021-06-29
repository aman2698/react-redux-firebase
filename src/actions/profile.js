import firebase from "../firebase";
import { showSnack, dismissSnack } from "react-redux-snackbar";

export const createProfile =
  (name, mobile, location, state, city, address, DOB) => async (dispatch) => {
    try {
      await firebase.updateProfile({
        name,
        mobile,
        location,
        state,
        city,
        address,
        DOB,
        isProfile: true,
      });
      dispatch({type:"REMOVE_LOADER"})
      dispatch(
        showSnack("myUniqueId", {
          label: `Profile Updated`,
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
    } catch (err) {
      console.log(err);
    }
  };


  export const companyProfile =
  (companyName, companyAddress,  companyLocation,) => async (dispatch) => {
    try {
      await firebase.updateProfile({
        companyName,
        companyAddress,
        companyLocation,
        isProfile: true,
      });
      dispatch({type:"REMOVE_LOADER"})
      dispatch(
        showSnack("myUniqueId", {
          label: `Profile Updated`,
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

export const uploadPic = (file) => async (dispatch) => {
  let user = firebase.auth().currentUser;
  let storageRef = firebase.storage().ref();
  let childRef = storageRef.child(`${user.uid}/profilePic.webp`);
  let fileObj = await childRef.put(file);

  let imgUrl = await childRef.getDownloadURL();
  await firebase.updateProfile({ imgUrl: imgUrl });
  return imgUrl;
};
export const getProfilePic = (file) => async (dispatch) => {
  let user = await firebase.auth().currentUser;
  let storageRef = await firebase.storage().ref();
  let url = await storageRef.child(`${user.uid}/profile.jpg`).getDownloadURL();
  return url;
};


