import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ListingDataContext } from '../Context/ListingContext'

function ListingPage1() {
  const navigate = useNavigate()
  const {
    title, setTitle,
    description, setDescription,
    frontendimage1, setfrontendImage1,
    frontendimage2, setfrontendImage2,
    frontendimage3, setfrontendImage3,
    backendimage1, setbackendImage1,
    backendimage2, setbackendImage2,
    backendimage3, setbackendImage3,
    rent, setRent,
    city, setCity,
    landMark, setLandMark,
  } = useContext(ListingDataContext)

  const handleNext = (e) => {
    e.preventDefault()
    navigate('/listing-page-2')
  }

  const handleImage1 = (e) => {
    const file = e.target.files[0]
    setbackendImage1(file)
    setfrontendImage1(URL.createObjectURL(file))
  }

  const handleImage2 = (e) => {
    const file = e.target.files[0]
    setbackendImage2(file)
    setfrontendImage2(URL.createObjectURL(file))
  }

  const handleImage3 = (e) => {
    const file = e.target.files[0]
    setbackendImage3(file)
    setfrontendImage3(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
        <Link
          to="/"
          aria-label="Back to home"
          className="text-gray-500 hover:text-orange-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="bg-orange-500 text-white text-sm font-semibold rounded-full px-4 py-1.5">Set Up your home</div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-orange-100 p-5 sm:p-8">
          <form onSubmit={handleNext} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5 text-left sm:col-span-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700 text-left">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter a title for your listing"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left sm:col-span-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 text-left">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your place"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="rent" className="text-sm font-medium text-gray-700 text-left">
                Rent
              </label>
              <input
                id="rent"
                name="rent"
                type="number"
                placeholder="Per day rent in ₹"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="city" className="text-sm font-medium text-gray-700 text-left">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left sm:col-span-2">
              <label htmlFor="landMark" className="text-sm font-medium text-gray-700 text-left">
                Landmark
              </label>
              <input
                id="landMark"
                name="landMark"
                type="text"
                placeholder="Nearby landmark"
                value={landMark}
                onChange={(e) => setLandMark(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="image1" className="text-sm font-medium text-gray-700 text-left">
                  Photo 1
                </label>
                <input
                  id="image1"
                  name="image1"
                  type="file"
                  accept="image/*"
                  onChange={handleImage1}
                  required
                  className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-500 file:text-sm file:font-medium hover:file:bg-orange-100"
                />
                {frontendimage1 && (
                  <img src={frontendimage1} alt="Photo 1 preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
                )}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="image2" className="text-sm font-medium text-gray-700 text-left">
                  Photo 2
                </label>
                <input
                  id="image2"
                  name="image2"
                  type="file"
                  accept="image/*"
                  onChange={handleImage2}
                  className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-500 file:text-sm file:font-medium hover:file:bg-orange-100"
                />
                {frontendimage2 && (
                  <img src={frontendimage2} alt="Photo 2 preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
                )}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="image3" className="text-sm font-medium text-gray-700 text-left">
                  Photo 3
                </label>
                <input
                  id="image3"
                  name="image3"
                  type="file"
                  accept="image/*"
                  onChange={handleImage3}
                  className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-500 file:text-sm file:font-medium hover:file:bg-orange-100"
                />
                {frontendimage3 && (
                  <img src={frontendimage3} alt="Photo 3 preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="sm:col-span-2 mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ListingPage1
