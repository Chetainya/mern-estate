import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignIn() {
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
    setError("")
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:3000/user/login" , {
        method : 'POST',
        body : JSON.stringify(formData),
        headers : {
          'Content-Type': 'application/json',
        }
        
      })
      const data = await response.json();
      if(data.status === 'faliure'){
        setError(data.message);
        return
      }
      navigate('/home')
    }catch(err){
      setError(err.message);
      return
    }
  }
  return (
    <div className='max-w-lg mx-auto'>

      <h1 className='text-center font-bold mx-auto my-10'>Sign In</h1>

      <form className='flex flex-col gap-4'>

        <input type='text' placeholder='Enter Email' id='email' className='p-3 rounded-lg' onChange={changeHandeler}></input>

        <input type='password' placeholder='Enter Password' id='password' className='p-3 rounded-lg' onChange={changeHandeler}></input>

        <button onClick={submitHandeler} className='border hover:opacity-85 disabled:opacity-50 bg-slate-600 p-3 rounded-lg text-white'>Sign In</button>
      </form>
      <div className='text-red-500'>
      {error ? error : null}

      </div>
      
    </div>
  )
}

export default SignIn
