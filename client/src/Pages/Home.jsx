import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const state = useSelector(state => state.user.userDetail);
    
  console.log(state);
  return (
    <div>
      Home Page
    </div>
  )
}

export default Home
