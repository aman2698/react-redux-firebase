import firebase from "../firebase";

// Signing up with Firebase
export const signup = (email, password) => async dispatch => {
    try {
        const resp = await firebase.auth()
      .createUserWithEmailAndPassword(email, password);
      console.log(resp);
    //   firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(dataBeforeEmail => {
    //       firebase.auth().onAuthStateChanged(function(user) {
    //         user.sendEmailVerification();
    //       });
    //       console.log(dataBeforeEmail);
    //     })
    //     .then(dataAfterEmail => {
    //       firebase.auth().onAuthStateChanged(function(user) {
    //         if (user.emailVerified) {
    //           // Email is verified
    //           console.log(".....................");
    //         } else {
    //           // Email is not verified
    //           console.log("gggggggggggggggg");
             
    //         }
    //       });
    //     })
    //     .catch(function(error) {
    //      console.log("error");
    //     });
    } catch (err) {
      console.log(err)
    }
  };
