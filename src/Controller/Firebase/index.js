import firebase from 'firebase'


  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBtxD5Sljx94y5BZySh3hIAkRCPhd1HdFs",
    authDomain: "supermarker-a585b.firebaseapp.com",
    databaseURL: "https://supermarker-a585b.firebaseio.com",
    projectId: "supermarker-a585b",
    storageBucket: "supermarker-a585b.appspot.com",
    messagingSenderId: "565957035390",
    appId: "1:565957035390:web:c7bb0b05401cd1180a1f2f",
    measurementId: "G-K9DC9Z6QL8"
  });

  const dbStorage = firebaseApp.storage();
  const db = firebaseApp.database();
 export {db, dbStorage};
