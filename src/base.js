import firebase from 'firebase';

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCvabrtDxxzzG5zLdplB_bWbcZAJzMZbWs",
    authDomain: "warma-parser.firebaseapp.com",
    databaseURL: "https://warma-parser.firebaseio.com",
    projectId: "warma-parser",
    storageBucket: "",
    messagingSenderId: "460201392461",
    appId: "1:460201392461:web:d51be23c58730eb7bbdf04"
  });

export {firebaseApp};
