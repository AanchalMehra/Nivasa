import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home, Wheat, Waves, BedDouble, Building, Users, TreePine, Store } from 'lucide-react'
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

function ListingPage2() {
  const navigate = useNavigate()
  const { category, setCategory } = useContext(ListingDataContext)

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => navigate('/listing-page-1')}
          aria-label="Back"
          className="text-gray-500 hover:text-orange-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="bg-orange-500 text-white text-sm font-semibold rounded-full px-4 py-1.5">Setup Your category</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">
          Which of these best describe your place?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-3xl">
          {categories.map(({ label, icon: Icon }) => {
            const isActive = category === label
            return (
              <button
                key={label}
                type="button"
                onClick={() => setCategory(label)}
                className={`flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-xl border p-3 sm:p-5 transition-all duration-200 hover:scale-105 hover:shadow-md ${
                  isActive
                    ? 'border-orange-500 bg-orange-50 text-orange-500'
                    : 'border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm font-medium">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
        <button
          type="button"
          disabled={!category}
          onClick={() => navigate('/listing-page-3')}
          className="w-full max-w-sm mx-auto block bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ListingPage2
