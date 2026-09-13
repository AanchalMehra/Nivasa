import React, { useContext } from 'react'
import NavBar from '../Component/NavBar'
import Card from '../Component/Card'
import { ListingDataContext } from '../Context/ListingContext'

function Home() {
  const { searchData, activeCategory } = useContext(ListingDataContext)

  const validListings = searchData.filter((listing) => listing && listing._id)

  const visibleListings =
    !activeCategory || activeCategory === 'Trending'
      ? validListings
      : validListings.filter((listing) => listing.category === activeCategory)

  return (
    <div>
      <NavBar/>

      <div className="px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleListings.map((listing) => (
            <Card key={listing._id} listing={listing} />
          ))}
        </div>

        {visibleListings.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-10">No listings found.</p>
        )}
      </div>
    </div>
  )
}

export default Home
