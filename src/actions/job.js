import firebase from "../firebase";
import { showSnack, dismissSnack } from "react-redux-snackbar";

export const jobPost = (formData, selected) => async (dispatch) => {
  try {
    console.log("hello");
    let user = firebase.auth().currentUser;
    let random = Math.floor(Math.random() * 1000000);
    let db = firebase.firestore();
    var docRef = db.collection("users").doc(user.uid);
    let doc = await docRef.get();
    let data = [];
    console.log("hello", user.uid, doc.data());

    if (!doc.exists) return;

    console.log("hello", user.uid, doc.data());
    if (doc.data().jobPost) {
      data = [...doc.data().jobPost, random.toString()];
    } else {
      data.push(random.toString());
    }
    await firebase.updateProfile({ jobPost: data });
    console.log("hello");
    await db.collection("jobs").doc(random.toString()).set({
      jobTitle: formData.aboutJob,
      jobDescription: formData.jobDescription,
      budget: formData.budget,
      location: formData.location,
      type: formData.type,
      status: formData.status,
      city: formData.city,
      skills: selected,
      id: random,
      createdAt: new Date(),
    });

    console.log("Document successfully written!");
    dispatch({ type: "REMOVE_LOADER" });

    dispatch(
      showSnack("myUniqueId", {
        label: `job Post Created`,
        timeout: 7000,
        button: { label: "OK, GOT IT" },
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const allJob = () => async (dispatch) => {
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();
  let docRef = db.collection("users").doc(user.uid);
  let doc = await docRef.get();
  let data = [];
  // console.log("hello",user.uid,doc.data());

  if (!doc.exists) return;

  // console.log("hello",user.uid,doc.data());
  if (doc.data().jobPost) {
    data = doc.data().jobPost;
  }
  // console.log(data);
  let result = [];

  for (let e of data) {
    let docRef = db.collection("jobs").doc(e);
    let daa = await docRef.get();
    result.push(daa.data());
  }
  dispatch({ type: "SET_JOB", payload: result });
  dispatch({ type: "REMOVE_LOADER" });
};

export const updateStatus = (id, status) => async (dispatch) => {
  try {
    console.log(id, status);
    let db = firebase.firestore();
    let doc = await db.collection("jobs").doc(id.toString()).get();
    await db
      .collection("jobs")
      .doc(id.toString())
      .set({ ...doc.data(), status: status });

    dispatch(allJob());
    dispatch(
      showSnack("myUniqueId", {
        label: `status updated`,
        timeout: 7000,
        button: { label: "OK, GOT IT" },
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const deleteJob = (id) => async (dispatch) => {
  try {
    let db = firebase.firestore();
    let user = firebase.auth().currentUser;
    await db.collection("jobs").doc(id.toString()).delete();
    let docRef = await db.collection("users").doc(user.uid).get();
    let data = docRef.data();
    console.log(data);
    data.jobPost.splice(data.jobPost.indexOf(id.toString()), 1);
    console.log(data);
    await db.collection("users").doc(user.uid).set(data);

    dispatch(allJob());
    dispatch(
      showSnack("myUniqueId", {
        label: `deleted`,
        timeout: 7000,
        button: { label: "OK, GOT IT" },
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const GetsAllJobs = () => async (dispatch) => {
  try {
    const tempDoc = [];
    const events = await firebase
      .firestore()
      .collection("jobs")
      .where("status", "==", "ACTIVE");
    events.get().then(async (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      console.log(tempDoc);

      dispatch({ type: "SET_JOB", payload: tempDoc });
      dispatch({ type: "REMOVE_LOADER" });
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetJobById = (id) => async (dispatch) => {
  try {
    let docRef = firebase.firestore().collection("jobs").doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          dispatch({ type: "GET_JOB_BY_ID", payload: doc.data() });
          dispatch({ type: "REMOVE_LOADER" });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const apply = (formData, id) => async (dispatch) => {
  try {
    let db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let docRef = await db.collection("users").doc(user.uid).get();
    if (!docRef.exists) return;
    let data = [];
    console.log("hello", user.uid, docRef.data());
    if (docRef.data().appliedJob) {
      data = [...docRef.data().appliedJob, id.toString()];
    } else {
      data.push(id.toString());
    }
    await firebase.updateProfile({ appliedJob: data });
    let doc = await db.collection("jobs").doc(id.toString()).get();
    let data1 = [];
    if (doc.data().appliedCandidate) {
      data1 = [...doc.data().appliedCandidate, user.uid.toString()];
    } else {
      data1.push(user.uid.toString());
    }
     console.log(user);
    //  debugger;
    // let random = Math.floor(Math.random() * 1000000);
    // await db.collection("users_jobs").doc(random.toString()).set({
      // uid: user.uid,
      // resumeUrl: formData.resumeUrl,
      // coverLetter: formData.coverLetter,
      // offerBudget: formData.offerBudget,
      // deliveryDate: formData.deliveryDate,
    // });

    let obj = {
      uid: user.uid,
      name:docRef.data().name,
      resumeUrl: formData.resumeUrl,
      coverLetter: formData.coverLetter,
      offerBudget: formData.offerBudget,
      deliveryDate: formData.deliveryDate,
    }

    let data2 = [];
    if (doc.data().jobApplied) {
      data2 = [...doc.data().jobApplied, obj];
    } else {
      data2.push(obj);
    }

    await db
      .collection("jobs")
      .doc(id.toString())
      .set({ ...doc.data(), appliedCandidate: data1, jobApplied: data2 });
    dispatch({ type: "REMOVE_LOADER" });

    dispatch(
      showSnack("myUniqueId", {
        label: `applied`,
        timeout: 7000,
        button: { label: "OK, GOT IT" },
      })
    );

    dispatch(GetsAllJobs());
  } catch (error) {
    console.log(error);
  }
};

export const uploadResume = (file) => async (dispatch) => {
  let user = firebase.auth().currentUser;
  let storageRef = firebase.storage().ref();
  let childRef = storageRef.child(`resume/${user.uid}_resume.webp`);
  let fileObj = await childRef.put(file);

  let resumeUrl = await childRef.getDownloadURL();
  // await firebase.updateProfile({ resumeUrl: resumeUrl });
  return resumeUrl;
};

export const uploadCover = (file) => async (dispatch) => {
  let user = firebase.auth().currentUser;
  let storageRef = firebase.storage().ref();
  let childRef = storageRef.child(`coverLetter/${user.uid}_cover.webp`);
  let fileObj = await childRef.put(file);

  let coverUrl = await childRef.getDownloadURL();
  // await firebase.updateProfile({ resumeUrl: resumeUrl });
  return coverUrl;
};
