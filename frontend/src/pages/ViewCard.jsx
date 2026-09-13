import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { ListingDataContext } from '../Context/ListingContext'
import { UserDataContext } from '../Context/UserContext'
import { BookingDataContext } from '../Context/BookingContext'
import EditListingModal from '../Component/EditListingModal'
import BookingModal from '../Component/BookingModal'

function ViewCard() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { viewCardData, handleViewCard } = useContext(ListingDataContext)
  const { userData } = useContext(UserDataContext)
  const { setCheckIn, setCheckOut } = useContext(BookingDataContext)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const handleReserveClick = () => {
    setCheckIn('')
    setCheckOut('')
    setShowBookingModal(true)
  }

  useEffect(() => {
    handleViewCard(id)
  }, [id])

  if (!viewCardData) {
    return null
  }

  const { title, description, image1, image2, image3, rent, city, landMark, category, host } = viewCardData
  const isOwner = host === userData?._id

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <div className="flex items-center px-4 sm:px-6 py-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Back to home"
          className="text-gray-500 hover:text-orange-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            In {landMark?.toUpperCase()}, {city?.toUpperCase()}
          </h2>

          <div className="grid grid-cols-2 grid-rows-2 gap-2 h-80 sm:h-96">
            {image1 && (
              <img
                src={image1}
                alt={title}
                className="col-start-1 row-span-2 w-full h-full object-cover rounded-l-2xl"
              />
            )}
            {image2 && (
              <img
                src={image2}
                alt={`${title} secondary`}
                className="col-start-2 row-start-1 w-full h-full object-cover rounded-tr-2xl"
              />
            )}
            {image3 && (
              <img
                src={image3}
                alt={`${title} tertiary`}
                className="col-start-2 row-start-2 w-full h-full object-cover rounded-br-2xl"
              />
            )}
          </div>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>{title}</span>
                <span className="text-gray-300">•</span>
                <span>{category}</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {landMark}
                </span>
              </div>
              <p className="text-sm text-gray-700 max-w-2xl">{description}</p>
              <p className="text-lg font-semibold text-gray-900">
                ₹{rent} <span className="text-sm font-normal text-gray-500">/ Day</span>
              </p>
            </div>

            {isOwner ? (
              <button
                type="button"
                onClick={() => setShowEditModal(true)}
                className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-lg px-6 py-2.5 transition-colors"
              >
                Edit Listing
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReserveClick}
                className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-lg px-6 py-2.5 transition-colors"
              >
                Reserve
              </button>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditListingModal listing={viewCardData} onClose={() => setShowEditModal(false)} />
      )}

      {showBookingModal && (
        <BookingModal onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  )
}

export default ViewCard
