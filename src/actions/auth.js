import firebase from "../firebase";
import { showSnack, dismissSnack } from "react-redux-snackbar";

export const signup = (email, name, role) => async (dispatch) => {
  try {
    
    var actionCodeSettings = {
      url: "http://localhost:3000/email-signup",
      handleCodeInApp: true,
    };
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        window.localStorage.setItem("role", role);
        window.localStorage.setItem("name", name);
        dispatch(
          showSnack("myUniqueId", {
            label: `Email send to ${email}`,
            timeout: 7000,
            button: { label: "OK, GOT IT" },
          })
        );
      })
      .catch((error) => {
        console.log(error);

      });
  } catch (err) {
    console.log(err);
  }
};
export const completeSignup = (formData,history) => async (dispatch) => {
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    
    var email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(async (result) => {
        console.log(result);
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("name");
        const user = await firebase.auth().currentUser;

        user
          .updatePassword(formData.password)
          .then(() => {

            console.log("success");
          })
          .catch((error) => {
            console.log("error");
          });
          // user.updateProfile({ role: formData.role, isProfile: false,isEmpty:false });
        await   firebase.updateProfile({ role: formData.role, isProfile: false,isEmpty:false });
          dispatch(
            showSnack("myUniqueId", {
              label: `Login Success Full`,
              timeout: 7000,
              button: { label: "OK, GOT IT" },
            })
          );
          history.push("/")
      })
      .catch((error) => {
        console.log(error);
      });
      
     
  }
};

export const signUpWithGoogleEmployee = (history) => async (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then( async (result) => {
      await firebase.auth().currentUser;
     await firebase.updateProfile({ role: "EMPLOYEE", isProfile: false,isEmpty:false });
      dispatch(
        showSnack("myUniqueId", {
          label: `SignUp Successfully!! Now Complete the profile`,
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })

      );
      history.push("/")
    });
};

export const signUpWithGoogleEmployer = (history) => async (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then( async (result) => {
     await firebase.auth().currentUser;
      await firebase.updateProfile({ role: "EMPLOYER", isProfile: false,isEmpty:false });
      dispatch(
        showSnack("myUniqueId", {
          label: `SignUp Successfully!! Now Complete the profile`,
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
      history.push("/")
    });
};

export const signInWithGoogle = () => async (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  await firebase
    .auth()
    .signInWithPopup(provider)
    await firebase.auth().currentUser;
    dispatch(
      showSnack("myUniqueId", {
        label: `Login successfully `,
        timeout: 7000,
        button: { label: "OK, GOT IT" },
      })

    );
};

export const signin = (email, password) => async (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("success");
         
      dispatch(
        showSnack("myUniqueId", {
          label: `Login Successfully`,
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
    })
    .catch((error) => {
      console.error(error);
    });
};

export const signout = (history) => async (dispatch) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT" });
        dispatch(
          showSnack("myUniqueId", {
            label: `Logout Successfully`,
            timeout: 7000,
            button: { label: "OK, GOT IT" },
          })
        );
        history.push("/");
      })
      .catch(() => {
        console.log("logout error");
      });
  } catch (err) {
    console.log("logout error");
  }
};

export const resetPassword = (email) => async (dispatch) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
      dispatch(
        showSnack("myUniqueId", {
          label: `Email Send Successfully`,
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
      console.log("email send");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
};

export const facebookSignUpForEmployee = (history) => async dispatch =>{
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
  .auth()
  .signInWithPopup(provider)
  .then( async (result) => {
    await firebase.auth().currentUser;
    await firebase.updateProfile({ role: "EMPLOYEE", isProfile: false,isEmpty:false });
    dispatch(
      showSnack("myUniqueId", {
        label: `SignUp Successfully!! Now Complete the profile`,
        timeout: 7000,
        button: { label: "OK, GOT IT" },
      })
    );
    history.push("/")
  })
  .catch((error) => {
    console.log(error);
  });
}
export const facebookSignUpForEmployer = (history) => async dispatch =>{
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
  .auth()
  .signInWithPopup(provider)
  .then( async (result) => {
    await firebase.auth().currentUser;
    await firebase.updateProfile({ role: "EMPLOYER", isProfile: false,isEmpty:false });
    dispatch(
      showSnack("myUniqueId", {
        label: `SignUp Successfully!! Now Complete the profile`,
        timeout: 7000,
        button: { label: "OK, GOT IT" },
      })
    );
    history.push("/")
  })
  .catch((error) => {
    console.log(error);
  });
}

export const updatePassword = (oldPassword,password) => async (dispatch) => {
  const user = await firebase.auth().currentUser;

  firebase.auth().fetchSignInMethodsForEmail(user.email).then(function(methods) {
       console.log(methods);
       if(methods.includes("password")){
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email, 
          oldPassword
      );
      user.reauthenticateWithCredential( credential).then(() => {
        user.updatePassword(password).then(() => {
          dispatch({type:"REMOVE_LOADER"})
          dispatch(
            showSnack("myUniqueId", {
              label: `password updated`,
              timeout: 7000,
              button: { label: "OK, GOT IT" },
            })
          );
        }).catch((error) => {
           console.log(error);
        });
      }).catch((error) => {
        // An error ocurred
        // ...
      });
       }
  } )


// firebase.auth().onAuthStateChanged(user, (users) => {
  // if (user) {
  //   // User is signed in, see docs for a list of available properties
  //   // https://firebase.google.com/docs/reference/js/firebase.User
  //   const uid = user.uid;
  //   // ...
  // } else {
  //   // User is signed out
  //   // ...
  // }
  // user.updatePassword(password).then(() => {
  //   dispatch(
  //     showSnack("myUniqueId", {
  //       label: `pass`,
  //       timeout: 7000,
  //       button: { label: "OK, GOT IT" },
  //     })
  //   );
  // }).catch((error) => {
  //    console.log(error);
  // });

// })



  
}