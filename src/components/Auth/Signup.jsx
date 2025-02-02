import { useContext, useState } from 'react'
import { Field, Label, Switch } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from "react-icons/tb";
import { AppContext } from '../../context/AppContext';
import Toast from 'react-hot-toast';
import Loader from '../Loader';

export default function Example() {
  const [agreed, setAgreed] = useState(false);

  const { setUserData, setIsLoggedIn, setLoading, loading } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData(prev => {
        return {
            ...prev,
            [e.target.name]: e.target.value
        }
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData)
    setLoading(true);
    const url = import.meta.env.VITE_API_BASE_URL + '/auth/signup';

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData})
    });

    const responseData = await response.json();
    if(responseData.success) { 
        setLoading(false);
        Toast.success(responseData.message);
        localStorage.setItem('token', responseData.token);
        setUserData(responseData.user);
        setIsLoggedIn(true);
        navigate('/');
    } else {
        setLoading(false);
        Toast.error(responseData.message);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-20 w-10/12 mx-auto">
        <Link to={'/'} className='text-xl flex gap-x-2 items-center text-blue-600 cursor-pointer'>
            <TbArrowBackUp /> Go back
        </Link>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      {
        loading ? (<Loader />) : (<>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-balance text-gray-900 sm:text-5xl">Signup</h2>
          </div>
          <form onSubmit={submitHandler} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                  Full name
                </label>
                <div className="mt-2.5">
                  <input
                    id="fullname"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={formData.name}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <input
                      id="phone-number"
                      name="phone"
                      type="phone"
                      onChange={handleChange}
                      value={formData.phone}
                      placeholder="1234567890"
                      className="block min-w-0 grow py-1.5 px-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                  Password
                </label>
                <div className="mt-2.5">
                  <input
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    type={`${agreed ? 'text' : 'password'}`}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2.5">
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    type={`${agreed ? 'text' : 'password'}`}
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              <Field className="flex gap-x-4 sm:col-span-2">
                    <div className="flex h-6 items-center">
                    <Switch
                        checked={agreed}
                        onChange={setAgreed}
                        className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-checked:bg-indigo-600"
                    >
                        <span className="sr-only">Agree to policies</span>
                        <span
                        aria-hidden="true"
                        className="size-4 transform rounded-full bg-white ring-1 shadow-xs ring-gray-900/5 transition duration-200 ease-in-out group-data-checked:translate-x-3.5"
                        />
                    </Switch>
                    </div>
                    <Label className="text-sm/6 text-gray-600">
                    Show Password
                    </Label>
                </Field>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block cursor-pointer w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Signup
              </button>
            </div>
          </form>
          <div className='text-sm mx-auto mt-2 font-[500] w-full text-black flex items-center justify-center gap-x-1'>
              {`Already have an account?`}<Link to={'/login'}><span className='text-blue-800 cursor-pointer font-semibold'>Login</span></Link>
          </div>
        </>)
      }
    </div>
  )
}