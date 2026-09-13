import { useContext } from 'react'
import {Route,Routes,Navigate} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import { UserDataContext } from './Context/UserContext'

function App() {
  const { userData, loading } = useContext(UserDataContext)

  if (loading) {
    return null
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/listing-page-1" element={userData ? <ListingPage1/> : <Navigate to="/login" />}/>
      <Route path="/listing-page-2" element={userData ? <ListingPage2/> : <Navigate to="/login" />}/>
      <Route path="/listing-page-3" element={userData ? <ListingPage3/> : <Navigate to="/login" />}/>
      <Route path="/my-listings" element={userData ? <MyListing/> : <Navigate to="/login" />}/>
      <Route path="/viewcard/:id" element={userData ? <ViewCard/> : <Navigate to="/login" />}/>


    </Routes>
    <ToastContainer position="top-center" autoClose={3000} />

      </>)
}

export default App
