import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB5vGO0VfN_W6dk6QWWbVK6nYIli1avGxA",
    authDomain: "linktree-react-5d065.firebaseapp.com",
    projectId: "linktree-react-5d065",
    storageBucket: "linktree-react-5d065.firebasestorage.app",
    messagingSenderId: "551385953776",
    appId: "1:551385953776:web:91bbe2be927ad8b8bfd935",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
