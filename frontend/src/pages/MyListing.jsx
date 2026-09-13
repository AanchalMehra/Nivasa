import React, { useContext } from 'react'
import NavBar from '../Component/NavBar'
import Card from '../Component/Card'
import { UserDataContext } from '../Context/UserContext'

function MyListing() {
  const { userData } = useContext(UserDataContext)
  const listings = userData?.listing ?? []

  return (
    <div>
      <NavBar />

      <div className="px-4 sm:px-6 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">My Listings</h1>

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
