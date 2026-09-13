import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { X, Home, Wheat, Waves, BedDouble, Building, Users, TreePine, Store } from 'lucide-react'
import { AuthDataContext } from '../Context/AuthContext'
import { ListingDataContext } from '../Context/ListingContext'

const categories = [
  { label: 'Villa', icon: Home },
  { label: 'Farm House', icon: Wheat },
  { label: 'Pool House', icon: Waves },
  { label: 'Rooms', icon: BedDouble },
  { label: 'Flat', icon: Building },
  { label: 'PG', icon: Users },
  { label: 'Cabins', icon: TreePine },
  { label: 'Shops', icon: Store },
]

function EditListingModal({ listing, onClose }) {
  const navigate = useNavigate()
  const { serverUrl } = useContext(AuthDataContext)
  const { setViewCardData } = useContext(ListingDataContext)

  const [title, setTitle] = useState(listing.title)
  const [description, setDescription] = useState(listing.description)
  const [rent, setRent] = useState(listing.rent)
  const [city, setCity] = useState(listing.city)
  const [landMark, setLandMark] = useState(listing.landMark)
  const [category, setCategory] = useState(listing.category)

  const [frontendimage1, setFrontendImage1] = useState(listing.image1)
  const [frontendimage2, setFrontendImage2] = useState(listing.image2)
  const [frontendimage3, setFrontendImage3] = useState(listing.image3)
  const [backendimage1, setBackendImage1] = useState(null)
  const [backendimage2, setBackendImage2] = useState(null)
  const [backendimage3, setBackendImage3] = useState(null)

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleImageChange = (file, setFrontend, setBackend) => {
    if (!file) return
    setBackend(file)
    setFrontend(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('rent', rent)
      formData.append('city', city)
      formData.append('landMark', landMark)
      formData.append('category', category)
      if (backendimage1) formData.append('image1', backendimage1)
      if (backendimage2) formData.append('image2', backendimage2)
      if (backendimage3) formData.append('image3', backendimage3)

      const result = await axios.post(
        `${serverUrl}/api/listing/update/${listing._id}`,
        formData,
        { withCredentials: true }
      )

      setViewCardData(result.data.listing)
      toast.success('Listing updated successfully')
      onClose()
      navigate('/')
    } catch (error) {
      console.error('Error updating listing:', error)
      toast.error(error.response?.data?.message || 'Failed to update listing')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await axios.delete(`${serverUrl}/api/listing/delete/${listing._id}`, {
        withCredentials: true,
      })

      toast.success('Listing deleted successfully')
      onClose()
      navigate('/')
    } catch (error) {
      console.error('Error deleting listing:', error)
      toast.error(error.response?.data?.message || 'Failed to delete listing')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-lg border border-orange-100 p-5 sm:p-8"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Edit Listing</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-orange-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5 text-left sm:col-span-2">
            <label htmlFor="edit-title" className="text-sm font-medium text-gray-700 text-left">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left sm:col-span-2">
            <label htmlFor="edit-description" className="text-sm font-medium text-gray-700 text-left">
              Description
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="edit-rent" className="text-sm font-medium text-gray-700 text-left">
              Rent
            </label>
            <input
              id="edit-rent"
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="edit-city" className="text-sm font-medium text-gray-700 text-left">
              City
            </label>
            <input
              id="edit-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left sm:col-span-2">
            <label htmlFor="edit-landMark" className="text-sm font-medium text-gray-700 text-left">
              Landmark
            </label>
            <input
              id="edit-landMark"
              type="text"
              value={landMark}
              onChange={(e) => setLandMark(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5 text-left">
            <span className="text-sm font-medium text-gray-700 text-left">Category</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map(({ label, icon: Icon }) => {
                const isActive = category === label
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCategory(label)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-2.5 transition-all duration-200 hover:scale-105 ${
                      isActive
                        ? 'border-orange-500 bg-orange-50 text-orange-500'
                        : 'border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="edit-image1" className="text-sm font-medium text-gray-700 text-left">
                Photo 1
              </label>
              <input
                id="edit-image1"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0], setFrontendImage1, setBackendImage1)}
                className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-500 file:text-sm file:font-medium hover:file:bg-orange-100"
              />
              {frontendimage1 && (
                <img src={frontendimage1} alt="Photo 1 preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
              )}
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="edit-image2" className="text-sm font-medium text-gray-700 text-left">
                Photo 2
              </label>
              <input
                id="edit-image2"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0], setFrontendImage2, setBackendImage2)}
                className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-500 file:text-sm file:font-medium hover:file:bg-orange-100"
              />
              {frontendimage2 && (
                <img src={frontendimage2} alt="Photo 2 preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
              )}
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="edit-image3" className="text-sm font-medium text-gray-700 text-left">
                Photo 3
              </label>
              <input
                id="edit-image3"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0], setFrontendImage3, setBackendImage3)}
                className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-500 file:text-sm file:font-medium hover:file:bg-orange-100"
              />
              {frontendimage3 && (
                <img src={frontendimage3} alt="Photo 3 preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
              )}
            </div>
          </div>

          <div className="sm:col-span-2 mt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving || deleting}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving || deleting}
              className="flex-1 bg-red-50 hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed text-red-600 font-medium text-sm rounded-lg py-2.5 transition-colors border border-red-200"
            >
              {deleting ? 'Deleting...' : 'Delete Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditListingModal
