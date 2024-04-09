import React, { useState } from 'react'

import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../Firebase';


function OAuth() {
    const [error , setError] = useState();

    async function handleGoogleAuth(){
        try{
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app)
        
        const result = await signInWithPopup(auth , provider)
        
        const response = await fetch('http://localhost:3000/user/googleAuth' , {
            method : "POST",
            body : JSON.stringify({userName : result.user.displayName , email : result.user.email , avatar : result.user.photoURL}),
            headers : {
                "content-type" : "application/json"
           }

        })
        const data = await response.json();
        console.log(data)
        if(!data){
            throw new Error('Error while login')
        }


        }catch(err){
            setError(`Cannot signIn using google ${err.message}`)
        }
    }


  return (
    <button onClick={handleGoogleAuth} type='button' className='p-3 rounded-lg bg-red-500 text-white hover:opacity-80' >
      {error ? error : 'Continue Using Google'}
    </button>
  )
}

export default OAuth