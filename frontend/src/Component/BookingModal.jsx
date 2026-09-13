import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, X } from 'lucide-react'
import { BookingDataContext } from '../Context/BookingContext'
import { ListingDataContext } from '../Context/ListingContext'

function BookingModal({ onClose }) {
  const navigate = useNavigate()
  const { viewCardData } = useContext(ListingDataContext)
  const {
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    totalNights,
    total,
    booking,
    handleBooking,
  } = useContext(BookingDataContext)

  const today = new Date().toISOString().split('T')[0]
  const amount = totalNights > 0 ? viewCardData.rent * totalNights : 0
  const airbnbCharge = amount * 0.07
  const tax = amount * 0.05

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await handleBooking()
    if (success) {
      onClose()
      navigate('/booked')
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-lg grid grid-cols-1 sm:grid-cols-2"
      >
        <div className="p-6 flex flex-col gap-4 border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Confirm and Book</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-gray-500 hover:text-orange-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <hr className="border-gray-200" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-900">Your Trip</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkIn" className="text-xs font-medium text-gray-700">
                  Check-in
                </label>
                <input
                  id="checkIn"
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkOut" className="text-xs font-medium text-gray-700">
                  Check-out
                </label>
                <input
                  id="checkOut"
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={booking || totalNights <= 0 || viewCardData.isBooked}
              className="mt-2 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
            >
              {viewCardData.isBooked ? 'Already Booked' : booking ? 'Booking...' : 'Book Now'}
            </button>
          </form>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="flex gap-3 rounded-xl border border-gray-200 p-3">
            <img
              src={viewCardData.image1}
              alt={viewCardData.title}
              className="w-20 h-20 rounded-lg object-cover shrink-0"
            />
            <div className="flex flex-col gap-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{viewCardData.title}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">{viewCardData.description}</p>
              <div className="flex items-center gap-1 text-xs text-gray-700">
                <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{viewCardData.ratings ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-900">Booking Price</h3>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>
                ₹{viewCardData.rent} x {totalNights > 0 ? totalNights : 0} nights
              </span>
              <span>₹{amount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>Airbnb charge (7%)</span>
              <span>₹{airbnbCharge.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <hr className="border-gray-200 my-1" />
            <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
              <span>Total Price</span>
              <span>₹{(amount + airbnbCharge + tax).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
