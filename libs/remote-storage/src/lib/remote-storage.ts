import {initializeApp} from "firebase/app"

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const firbaseApp = initializeApp(firebaseConfig);
