import React, { useState } from "react";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../Store/Store";

function OAuth() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleGoogleAuth() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const response = await fetch("http://localhost:3000/user/googleAuth", {
        method: "POST",
        credentials:"include",
        mode: 'cors',
        body: JSON.stringify({
          userName: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data)
      if (data.error) {
        throw new Error(data.error.message);
      }
      dispatch(
        userSliceActions.successLogIn({
          userName: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        })
      );
      navigate("/");
    } catch (err) {
      setError(`Cannot signIn using google ${err.message}`);
    }
  }

  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="p-3 rounded-lg bg-red-500 text-white hover:opacity-80"
    >
      {error ? error : "Continue Using Google"}
    </button>
  );
}

export default OAuth;
