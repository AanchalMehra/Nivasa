import { Route,Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import MyListing from './pages/MyListing'
import MyBookings from './pages/MyBookings'
import BookingConfirmed from './pages/BookingConfirmed'
import ViewCard from './pages/ViewCard'
import LoginPromptModal from './Component/LoginPromptModal'
import RequireAuth from './Component/RequireAuth'
import { useContext } from 'react'
import { UserDataContext } from './Context/UserContext'

function App() {
  const { loading } = useContext(UserDataContext)

  if (loading) {
    return null
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/listing-page-1" element={<RequireAuth><ListingPage1/></RequireAuth>}/>
      <Route path="/listing-page-2" element={<RequireAuth><ListingPage2/></RequireAuth>}/>
      <Route path="/listing-page-3" element={<RequireAuth><ListingPage3/></RequireAuth>}/>
      <Route path="/my-listings" element={<RequireAuth><MyListing/></RequireAuth>}/>
      <Route path="/bookings" element={<RequireAuth><MyBookings/></RequireAuth>}/>
      <Route path="/viewcard/:id" element={<RequireAuth><ViewCard/></RequireAuth>}/>
      <Route path="/booked" element={<RequireAuth><BookingConfirmed/></RequireAuth>}/>


    </Routes>
    <ToastContainer position="top-center" autoClose={3000} />
    <LoginPromptModal />

      </>)
}

export default App
