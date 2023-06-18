import {initializeApp} from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyADhjzmTcQVWs0iKDcnWo6BpB3n_sE_8gQ",
  authDomain: "ly-fullstack.firebaseapp.com",
  projectId: "ly-fullstack",
  storageBucket: "ly-fullstack.appspot.com",
  messagingSenderId: "1034133807267",
  appId: "1:1034133807267:web:03a7a9b74497a9c0d19f16"
};

export const firbaseApp = initializeApp(firebaseConfig);