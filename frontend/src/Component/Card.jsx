import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { UserDataContext } from '../Context/UserContext'
import { ListingDataContext } from '../Context/ListingContext'

function Card({ listing }) {
  const navigate = useNavigate()
  const { userData } = useContext(UserDataContext)
  const { handleViewCard } = useContext(ListingDataContext)
  const images = [listing.image1, listing.image2, listing.image3].filter(Boolean)
  const [index, setIndex] = useState(0)

  const handleClick = () => {
    if (userData) {
      handleViewCard(listing._id)
      navigate(`/viewcard/${listing._id}`)
    } else {
      navigate('/login')
    }
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      onClick={handleClick}
      className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer"
    >
      <div className="relative w-full h-56 overflow-hidden bg-gray-100">
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${listing.title} ${i + 1}`}
              className="w-full h-full object-cover shrink-0"
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{listing.title}</h3>
          <span className="shrink-0 text-xs font-medium text-orange-500 bg-orange-50 rounded-full px-2 py-0.5">
            {listing.category}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{listing.landMark}, {listing.city}</span>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">{listing.description}</p>

        <p className="text-sm font-semibold text-gray-900 mt-1">
          ₹{listing.rent} <span className="text-xs font-normal text-gray-500">/ day</span>
        </p>
      </div>
    </div>
  )
}

export default Card
