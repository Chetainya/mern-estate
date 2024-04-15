import React, { useRef, useState  } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSliceActions } from "../../Store/Store";
import axios from 'axios'

function Profile() {
  const user = useSelector((state) => state.user.userDetail);
 
 
  const updatedPassword = useRef();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function updateHandeler() {
    const postData = {
      password: updatedPassword.current.value,
    };

    try {
      const response = await fetch("http://localhost:3000/user/update", {
        method: "POST",
        body: JSON.stringify(postData),
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "faliure") {
        setError(data.message);
        // console.log("failure")
        return;
      }
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    }
  }

  async function profilePictureHandeler(e){
    
    const formData = new FormData();
    
    formData.append('file' , e.target.files[0]);
    const response = await axios.post("http://localhost:3000/user/update/profilePicture" , formData , { withCredentials: true });
    
    dispatch(userSliceActions.profilePictureUpdate(`http://localhost:3000/uploads/${response.data}`));
    
  
  }
  
  return (
    <div className="my-10">
      <div className="flex flex-col items-center justify-center max-w-sm mx-auto gap-4">
        <label htmlFor="profilePicture">
          <img
            src={user.avatar}
            className="w-14 rounded-full"
            alt="profile"
          ></img>
        </label>
        <input type="file" id="profilePicture" className="hidden" onChange={profilePictureHandeler} />
        <input
          type="email"
          disabled
          value={user.email}
          className="w-full p-3 rounded-lg bg-slate-400 "
        ></input>
        <input
          type="password"
          ref={updatedPassword}
          className="w-full p-3 rounded-lg bg-slate-400 placeholder:text-white "
          placeholder="Update Password"
        ></input>
        <button
          className="boder bg-blue-900 text-white rounded-lg w-full p-3 hover:opacity-80"
          onClick={updateHandeler}
        >
          Update Password
        </button>
        <button className="text-black rounded-lg bg-green-500 w-full p-3 hover:opacity-80">
          Create Listing
        </button>
        <div className="flex flex-row w-full justify-between">
          <button className="text-red-600">Delete Account</button>
          <button className="text-red-600">Sign Out</button>
        </div>
        <Link to="#" className=" text-green-700 ">
          Show Listing
        </Link>
        {error ? <p className="text-red w-full">{error}</p> : null}
      </div>
    </div>
  );
}

export default Profile;
