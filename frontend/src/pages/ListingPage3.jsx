import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { toast } from 'react-toastify'
import { ListingDataContext } from '../Context/ListingContext'

function ListingPage3() {
  const navigate = useNavigate()
  const {
    title,
    description,
    frontendimage1,
    frontendimage2,
    frontendimage3,
    rent,
    city,
    landMark,
    category,
    adding,
    handleAddListing,
  } = useContext(ListingDataContext)

  const handleAdd = async () => {
    try {
      await handleAddListing()
      toast.success('Listing added successfully')
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => navigate('/listing-page-2')}
          aria-label="Back"
          className="text-gray-500 hover:text-orange-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="bg-orange-500 text-white text-sm font-semibold rounded-full px-4 py-1.5">Review your listing</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            In {landMark.toUpperCase()}, {city.toUpperCase()}
          </h2>

          <div className="grid grid-cols-2 grid-rows-2 gap-2 h-80 sm:h-96">
            {frontendimage1 && (
              <img
                src={frontendimage1}
                alt={title}
                className="col-start-1 row-span-2 w-full h-full object-cover rounded-l-2xl"
              />
            )}
            {frontendimage2 && (
              <img
                src={frontendimage2}
                alt={`${title} secondary`}
                className="col-start-2 row-start-1 w-full h-full object-cover rounded-tr-2xl"
              />
            )}
            {frontendimage3 && (
              <img
                src={frontendimage3}
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

            <button
              type="button"
              onClick={handleAdd}
              disabled={adding}
              className="shrink-0 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg px-6 py-2.5 transition-colors"
            >
              {adding ? 'Adding...' : 'Add Listing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingPage3
