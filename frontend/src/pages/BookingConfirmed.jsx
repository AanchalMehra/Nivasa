import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { BookingDataContext } from '../Context/BookingContext'
import { ListingDataContext } from '../Context/ListingContext'
import StarRating from '../Component/StarRating'

function BookingConfirmed() {
  const navigate = useNavigate()
  const { bookingData } = useContext(BookingDataContext)
  const { viewCardData, handleRatings } = useContext(ListingDataContext)
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const listingId = bookingData?.listing || viewCardData?._id

  const handleSubmit = async () => {
    if (!rating || !listingId) {
      navigate('/')
      return
    }

    try {
      setSubmitting(true)
      await handleRatings(listingId, rating)
      toast.success('Thanks for your rating!')
    } catch (error) {
      console.error('Error submitting rating:', error)
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to submit rating')
    } finally {
      setSubmitting(false)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4 py-10 gap-6 sm:gap-8">
      <div className="w-full max-w-md flex flex-col items-center gap-3 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Confirmed</h1>
        <p className="text-sm text-gray-600">Your stay has been booked successfully.</p>
      </div>

      {bookingData && (
        <div className="w-full max-w-md flex flex-col gap-2 border border-gray-200 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Booking ID</span>
            <span className="font-medium text-gray-900 truncate max-w-[60%]">{bookingData._id}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Owner</span>
            <span className="font-medium text-gray-900 truncate max-w-[60%]">
              {bookingData.host?.email || '—'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Total Rent</span>
            <span className="font-medium text-gray-900">₹{Number(bookingData.totalRent).toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-md flex flex-col items-center gap-4 border border-gray-200 rounded-2xl p-5 sm:p-6">
        <h2 className="text-base font-semibold text-gray-900">Rate your experience</h2>
        <StarRating value={rating} onChange={setRating} />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="text-sm font-medium text-gray-500 hover:text-orange-500"
      >
        Back to Home
      </button>
    </div>
  )
}

export default BookingConfirmed
