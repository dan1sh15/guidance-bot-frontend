import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { AppContext } from '../context/AppContext';
import JobRolesDropdown from './JobRolesDropdown';

export default function Home() {
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();

    const { isLoggedIn, userData, setIsLoggedIn } = useContext(AppContext);

    const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      setShowNav(false);
      navigate('login');
    };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-5 z-50 bg-white shadow-2xl rounded-lg w-10/12 mx-auto">
        <nav aria-label="Global" className="flex items-center justify-between p-5 lg:px-8">
          <Link to={'/'} className="flex lg:flex-1">
              <h1 className='text-3xl text-blue-800 max-xl:text-2xl max-lg:text-xl max-sm:text-lg'>Guidance Bot</h1>
          </Link>
          <div className="flex items-center justify-center text-[1.15rem] text-blue-800 gap-x-5 max-xl:text-2xl max-lg:text-xl max-sm:text-lg">
                <Link to={'/market-trends'}>
                    Market Trends
                </Link>
              <Link to={'/chat-bot'} className='cursor-pointer max-lg:text-lg max-md:text-[1rem] max-sm:text-sm'>ChatBot</Link>
              <div className='flex items-center relative justify-center bg-blue-800 p-[8px] rounded-full cursor-pointer'><FaUser className='text-white text-[1rem]' onClick={() => {
                setShowNav(!showNav)
              }} />
                <div className={`absolute rounded-xl shadow-2xl flex flex-col gap-y-5 items-center justify-center p-10 bg-white z-10 ${showNav ? 'top-10' : '-top-[1200px] w-fit'} transition-all duration-300 ease-in-out`}>
                  {
                    isLoggedIn ? (<>
                      <div className='select-none text-center'>{userData.name}</div>
                      <button onClick={handleLogout} className=' select-none cursor-pointer text-red-500'>Logout</button>
                    </>) : (
                      <>
                        <button onClick={() => {
                          navigate('/login');
                        }} className=' select-none cursor-pointer'>Login</button>
                        <button onClick={() => {
                          navigate('/signup');
                        }} className=' select-none cursor-pointer'>Signup</button>
                      </>
                    )
                  }
                </div>
              </div>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>


        <div className="mx-auto max-w-3xl py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-balance text-gray-900">
                Empower Your Career with the Right Skills!
            </h1>
            <p className="mt-8 text-lg font-medium italic text-pretty text-gray-500">
              {`GuidanceBot is an AI-powered career counseling platform designed to help users find the best career paths, skill-building projects, and top-rated courses. Whether you're a beginner or an experienced professional, our platform provides personalized recommendations for job roles, required skills, and career growth insights. Explore industry-relevant projects, get curated Coursera and Udemy courses, and take the next step in your professional journey!`}
            </p>
            <div className="mt-10 w-full flex items-center justify-center gap-x-6">
             <JobRolesDropdown />
            </div>
          </div>
        </div>




        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}
