import { useContext, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function JobRolesDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select a role");
  const { setLoading, loading } = useContext(AppContext);
  const navigate = useNavigate();

  const [jobRoles, setJobRoles] = useState([]);

  const fetchJobRoles = async () => {
    setLoading(true);
    const url = import.meta.env.VITE_API_FLASK_URL + '/job-roles';

    const response = await fetch(url);

    if (!response.ok) {
      setJobRoles([]);
    }

    const responseData = await response.json();
    setJobRoles(responseData?.job_roles);
    setLoading(false);
  };

  useEffect(() => {
    // fetch the dropdwon details
    fetchJobRoles();
  }, []);

  const features = [
    {
        id: 1,
        path: "/projects-and-skills",
        name: "Projects & Skills"
    },
    {
        id: 2,
        path: "/recommended-courses",
        name: "Recommended Courses"
    },
    {
        id: 3,
        path: "/recommended-udemy-courses",
        name: "Udemy Courses"
    },
    {
        id: 4,
        path: "/career-path",
        name: "Career Path"
    }
  ];

  return (
    loading ? (<Loader />) : <div className="relative inline-block w-9/12 mx-auto text-xl">
      <button
        onClick={() => setOpen(!open)}
        className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-between cursor-pointer"
      >
        {selected}
        <ChevronDown size={18} />
      </button>

      <span className="text-sm font-semibold w-full">Select a job role from above to see the following data</span>

      {open && (
        <div className="absolute mt-2 w-full bg-white border shadow-md rounded-lg overflow-auto h-[30vh] outline-none">
          {jobRoles.map((role, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 hover:bg-indigo-100 outline-none font-semibold text-[1rem] cursor-pointer"
              onClick={() => {
                setSelected(role);
                setOpen(false);
              }}
            >
              {role}
            </button>
          ))}
        </div>
      )}
      <br />
      {
        <div className='w-full grid grid-cols-1 gap-3 items-center justify-center mt-10'>
        {
            features && features.map(feature => (
            <button 
              onClick={() => navigate(`${feature.path}/${selected}`)}
              disabled={selected === "Select a role"}
              key={feature.id} 
              className='bg-white rounded-lg shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer border-2 border-gray-400 text-xl py-5 px-7 disabled:cursor-wait'>
                <div>{feature.name}</div>
            </button>
            ))
        }
    </div>
      }
      
    </div>
  );
}
