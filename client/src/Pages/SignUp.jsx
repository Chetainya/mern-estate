import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import OAuth from '../Components/OAuth';



function SignUp() {
  const [formData , setFormData] = useState({});
  const [error , setError] = useState("");
  const navigate = useNavigate();


  function changeHandeler(e){
    setError("")
        setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
    
  }
  async function submitHandeler(e){
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/user/signup' , {
        method : 'POST',
        body : JSON.stringify(formData),
        headers : {
          'Content-Type': 'application/json',
        }
      })
      const data = await(response.json());
      if(data.status === "faliure"){
        console.log('inside faliue')
        setError(data.message)
        return
      }
      navigate('/signin')
    }catch(err){
      setError(err.message)
    }
  }


  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='font-bold mx-auto my-10 text-center'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' id='userName' className='border p-3 rounded-lg' onChange={changeHandeler} />
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg' onChange={changeHandeler} />
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={changeHandeler} />
        <button onClick={submitHandeler} className='border p-3 rounded-lg bg-slate-600 hover:opacity-80 text-white disabled:opacity-50'>Sign Up</button>
        <OAuth />
      </form>
      <div className='text-red-600'>
        {error ? error : null}
      </div>
    </div>
  )
}

export default SignUp
