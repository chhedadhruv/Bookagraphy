import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Stylesheets/Login.css";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import { signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

function Signup({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <div className="main">
        <div className="box bigbox">
          <h1>Sign Up</h1>
          <form>
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
          <button className="signinbutton" onClick={signup}>
            Sign Up
          </button>
          <p className="text">
            Have an account?
            <Link to="/login" className="a">
              {" "}
              Sign In
            </Link>
          </p>
          <button className="signinbutton" onClick={signInWithGoogle}>
            <FcGoogle className="googlelogo" />
            <> Sign Up with Google</>
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
