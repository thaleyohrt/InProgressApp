//---------------------------------------------------------------------
// Your web app's Firebase configuration (9 lines of code)
// Replace the configuration with YOUR project's API information
// copied from the firebase console (settings) of your project.
//---------------------------------------------------------------------

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBtPVBxeOUiMGOb0JkfcmrjAo-cBny5ysI",
    authDomain: "inprogress-7d731.firebaseapp.com",
    databaseURL: "https://inprogress-7d731.firebaseio.com",
    projectId: "inprogress-7d731",
    storageBucket: "inprogress-7d731.appspot.com",
    messagingSenderId: "840287480599",
    appId: "1:840287480599:web:51544848c551cc39c1a552"
};
//------------------------------------------------
// Initialize Firebase and Firestore reference
// Do not delete!
//------------------------------------------------
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();