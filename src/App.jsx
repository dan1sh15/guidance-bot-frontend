import './App.css'
import GuidanceBotUI from './components/GuidanceBot';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home';
import MarketTrends from './components/MarketTrends';
import ProjectsAndSkills from './components/Features/ProjectsAndSkills';
import UdemyCourses from './components/Features/UdemyCourses';
import Courses from './components/Features/Courses';
import CareerPaths from './components/Features/CareerPath';

function App() {

  return (
    <div className='text-4xl font-bold'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat-bot' element={<GuidanceBotUI />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/market-trends' element={<MarketTrends />} />
        <Route path='/projects-and-skills/:job_role' element={<ProjectsAndSkills />} />
        <Route path='/recommended-udemy-courses/:job_role' element={<UdemyCourses />} />
        <Route path='/recommended-courses/:job_role' element={<Courses />} />
        <Route path='/career-path/:job_role' element={<CareerPaths />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
