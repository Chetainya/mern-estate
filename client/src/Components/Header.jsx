import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex flex-row justify-between  font-bold sm:text-xl p-3 max-w-6xl mx-auto items-center'>
        <Link to='/'>
        <h1 className='flex flex-wrap'>
            <span className='text-slate-500'>MERN</span>
            <span className='text-slate-700'>RealEstate</span>
        </h1>
        </Link>
        <form className='flex items-center bg-slate-100 rounded-md p-3'>
            <input type='text' placeholder='Search' className='bg-transparent focus:outline-none w-24 sm:w-64'></input>
            <FaSearch className='text-slate-600'></FaSearch>
        </form>
        <ul className='flex gap-4'>
            <Link to="/">
        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
        </Link>
        <Link to="/about">
        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
        </Link>
        <Link to="/signin">
        <li className=' text-slate-700 hover:underline cursor-pointer'>SignIn</li>
        </Link>
      </ul>
      </div>
      
    </header>
  )
}

export default Header
