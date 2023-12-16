// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBXF5d-d2wpN5iO5vxPUSY_s9U2EgHWZG0",
  authDomain: "auto-crawling-web.FIREBASEapp.com",
  databaseURL: "https://auto-crawling-web-default-rtdb.asia-southeast1.FIREBASEdatabase.app",
  projectId: "auto-crawling-web",
};


console.log("APIKEY:",firebaseConfig.apiKey);
console.log(process.env.HOME)
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export async function googleLogin() {
  return signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    return user;
  });
}


export async function googleLogout() {
  return signOut(auth)
  .then(() => null)
}


export function googleUserChange(callback) {
  onAuthStateChanged(auth, (user) => {
    if(user){
      callback(user.email);
    }
  });
}
