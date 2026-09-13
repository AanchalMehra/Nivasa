import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Card from '../Component/Card'
import { UserDataContext } from '../Context/UserContext'

function MyListing() {
  const navigate = useNavigate()
  const { userData } = useContext(UserDataContext)
  const listings = userData?.listing ?? []

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
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">My Listings</h1>
      </div>

      <div className="px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Card key={listing._id} listing={listing} />
          ))}
        </div>

        {listings.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-10">You haven't listed anything yet.</p>
        )}
      </div>
    </div>
  )
}

export default MyListing
