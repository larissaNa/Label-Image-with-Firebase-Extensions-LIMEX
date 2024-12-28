const firebaseConfig = {
    apiKey: "AIzaSyDPzU2WE44jrV8cbplMFsCv1y-5LFeO3qU",
    authDomain: "uploadimg-fc170.firebaseapp.com",
    projectId: "uploadimg-fc170",
    storageBucket: "uploadimg-fc170.appspot.com",
    messagingSenderId: "779865574756",
    appId: "1:779865574756:web:64f2e8833bd6a6d50bbe71",
    measurementId: "G-S2VR1JKHPY"
    };
    
  // Inicializa o Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  