import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthDataContext } from './AuthContext'
import { UserDataContext } from './UserContext'
import { ListingDataContext } from './ListingContext'

export const BookingDataContext = createContext()

function BookingContext({ children }) {
  const { serverUrl } = useContext(AuthDataContext)
  const { userData, getCurrentUserData } = useContext(UserDataContext)
  const { viewCardData, getListing } = useContext(ListingDataContext)

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [totalNights, setTotalNights] = useState(0)
  const [total, setTotal] = useState(0)
  const [bookingData, setBookingData] = useState(null)
  const [booking, setBooking] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    if (checkIn && checkOut && viewCardData) {
      const N = (new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000)
      setTotalNights(N)

      if (N > 0) {
        const amount = viewCardData.rent * N
        const airbnbCharge = amount * 0.07
        const tax = amount * 0.05
        setTotal(amount + airbnbCharge + tax)
      } else {
        setTotal(0)
      }
    } else {
      setTotalNights(0)
      setTotal(0)
    }
  }, [checkIn, checkOut, viewCardData])

  const handleBooking = async () => {
    try {
      setBooking(true)
      setBookingError(null)

      const currentUser = userData
      const listing = viewCardData

      const bookingPayload = {
        host: listing.host,
        guest: currentUser._id,
        listing: listing._id,
        totalRent: total,
        checkIn,
        checkOut,
      }

      const result = await axios.post(
        `${serverUrl}/api/booking/create/${listing._id}`,
        bookingPayload,
        { withCredentials: true }
      )
      await getCurrentUserData()
      await getListing()
      setBookingData(result.data.booking)

      toast.success('Booking confirmed')
      return true
    } catch (error) {
      console.error('Error creating booking:', error)
      setBookingError(error.response?.data?.error || error.response?.data?.message || 'Failed to book listing')
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to book listing')
      return false
    } finally {
      setBooking(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelling(true)
      const result = await axios.delete(
        `${serverUrl}/api/booking/cancel/${bookingId}`,
        { withCredentials: true }
      )
      toast.success(result.data?.message || 'Booking cancelled successfully')
      await getCurrentUserData()
      await getListing()
      return true
    } catch (error) {
      console.error('Error cancelling booking:', error)
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to cancel booking')
      return false
    } finally {
      setCancelling(false)
    }
  }

  const value = {
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    totalNights, setTotalNights,
    total, setTotal,
    bookingData, setBookingData,
    booking,
    bookingError,
    handleBooking,
    cancelling,
    handleCancelBooking,
  }

  return (
    <BookingDataContext.Provider value={value}>
      {children}
    </BookingDataContext.Provider>
  )
}

export default BookingContext
