import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft, MapPin, Calendar, User, XCircle } from 'lucide-react'
import { UserDataContext } from '../Context/UserContext'
import { BookingDataContext } from '../Context/BookingContext'
import { ListingDataContext } from '../Context/ListingContext'
import StarRating from '../Component/StarRating'

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function MyBookings() {
  const navigate = useNavigate()
  const { userData, getCurrentUserData } = useContext(UserDataContext)
  const { cancelling, handleCancelBooking } = useContext(BookingDataContext)
  const { handleRatings } = useContext(ListingDataContext)
  const bookings = userData?.booking ?? []
  const [confirmId, setConfirmId] = useState(null)
  const [ratingListingId, setRatingListingId] = useState(null)

  const handleConfirmCancel = async () => {
    const id = confirmId
    setConfirmId(null)
    await handleCancelBooking(id)
  }

  const handleRate = async (listingId, value) => {
    try {
      setRatingListingId(listingId)
      await handleRatings(listingId, value)
      toast.success('Rating saved')
      await getCurrentUserData()
    } catch (error) {
      console.error('Error saving rating:', error)
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to save rating')
    } finally {
      setRatingListingId(null)
    }
  }

  return (
    <div>
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Back to home"
          className="text-gray-500 hover:text-orange-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 sm:px-6 py-4">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">My Bookings</h1>
      </div>

      <div className="px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => {
            const listing = b.listing
            if (!listing) return null

            return (
              <div
                key={b._id}
                className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white"
              >
                <div className="relative w-full h-44 bg-gray-100">
                  <img src={listing.image1} alt={listing.title} className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-2 right-2 flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1 shadow bg-white/90 ${
                      b.status === 'cancelled' ? 'text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {b.status === 'cancelled' ? <XCircle className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    {b.status === 'cancelled' ? 'Cancelled' : 'Booked'}
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{listing.title}</h3>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{listing.landMark}, {listing.city}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {formatDate(b.checkIn)} - {formatDate(b.checkOut)}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    ₹{Number(b.totalRent).toFixed(2)} total
                  </p>

                  {b.status !== 'cancelled' && (
                    <div
                      className={`flex flex-col gap-1 mt-1 ${
                        ratingListingId === listing._id ? 'opacity-60 pointer-events-none' : ''
                      }`}
                    >
                      <span className="text-xs font-medium text-gray-700">Your Rating</span>
                      <StarRating
                        value={listing.ratings ?? 0}
                        onChange={(value) => handleRate(listing._id, value)}
                      />
                    </div>
                  )}

                  {b.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => setConfirmId(b._id)}
                      disabled={cancelling}
                      className="mt-2 w-full bg-red-50 hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed text-red-600 font-medium text-sm rounded-lg py-2 transition-colors border border-red-200"
                    >
                      {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {bookings.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-10">You have no bookings yet.</p>
        )}
      </div>

      {confirmId && (
        <div
          onClick={() => setConfirmId(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col gap-4"
          >
            <h3 className="text-base font-semibold text-gray-900">Cancel this booking?</h3>
            <p className="text-sm text-gray-600">
              This action cannot be undone. The listing will become available again.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmId(null)}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50"
              >
                No, Keep it
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={cancelling}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg py-2 text-sm font-medium"
              >
                {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings
