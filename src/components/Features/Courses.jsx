import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { AppContext } from '../../context/AppContext';
import Loader from '../Loader';

export default function Courses() {
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();
    const { job_role } = useParams();

    const { isLoggedIn, userData, setIsLoggedIn, loading, setLoading } = useContext(AppContext);

    const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      setShowNav(false);
      navigate('login');
    };

    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        setLoading(true);
        const url = import.meta.env.VITE_API_FLASK_URL + '/recommended-courses/' + job_role;
        const response = await fetch(url);

        if (!response.ok) {
            setCourses([]);
        }

        const responseData = await response?.json();
        setCourses(responseData);

        setLoading(false);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

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

{
    loading ? (<div className='py-24 sm:py-32'><Loader /></div>) : (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Recommended Courses</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Courses recommended for {job_role}</p>
                </div>
                <div className="mx-auto mt-10 grid w-full grid-cols-3 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {courses.map((courses, idx) => (
                    <div key={idx+1} className='flex flex-col gap-y-7 px-5 py-5 justify-between rounded-lg capitalize text-lg shadow-xl bg-white'>
                        <p className='text-xl font-bold text-center'>{courses?.course}</p>
                        <p className='text-slate-600'><strong>Duration: </strong>{courses?.duration}</p>
                        <p className='text-slate-600'><strong>Partner: </strong>{courses?.partner}</p>
                        <p className='text-slate-600'><strong>Skills: </strong>{courses?.skills}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}
        
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
