import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, Flame, Home, Wheat, Waves, BedDouble, Building, Users, TreePine, Store } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthDataContext } from '../Context/AuthContext'
import { UserDataContext } from '../Context/UserContext'
import { ListingDataContext } from '../Context/ListingContext'
import logo from '../assets/nivasa.png'

const categories = [
  { label: 'Trending', icon: Flame },
  { label: 'Villa', icon: Home },
  { label: 'Farm House', icon: Wheat },
  { label: 'Pool House', icon: Waves },
  { label: 'Rooms', icon: BedDouble },
  { label: 'Flat', icon: Building },
  { label: 'PG', icon: Users },
  { label: 'Cabins', icon: TreePine },
  { label: 'Shops', icon: Store },
]

function NavBar() {
  const { serverUrl } = useContext(AuthDataContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const { userData } = useContext(UserDataContext)
  const { activeCategory, setActiveCategory, handleSearch } = useContext(ListingDataContext)
  const [input, setInput] = useState('')

  useEffect(() => {
    handleSearch(input)
  }, [input])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setMenuOpen(false)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      toast.success(result.data?.message || 'Logout successful')
      navigate('/login')
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.error || error.response.data?.message || 'Something went wrong')
      } else if (error.request) {
        toast.error('Unable to reach the server. Please try again later.')
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    }
  }

  const menuItems = [
    userData
      ? { label: 'Logout', action: handleLogout }
      : { label: 'Login', to: '/login' },
    { label: 'List your home', to: '/listing-page-1' },
    { label: 'My listings', to: '/my-listings' },
    { label: 'My bookings', to: '/bookings' },
  ]

  return (
    <nav className="w-full bg-[rgb(250,247,242)] border-b border-gray-200 shadow-sm px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Nivasa" className="h-14 w-auto" />
        </Link>

        <div className="hidden min-[480px]:flex flex-1 min-w-0 max-w-[200px] sm:max-w-[260px] md:max-w-sm lg:max-w-md xl:max-w-lg">
          <div className="flex w-full items-center gap-2 rounded-full border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
            <Search className="w-4 h-4 text-orange-400 shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search destinations"
              className="w-full outline-none text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/listing-page-1"
            className="hidden sm:inline text-sm font-medium text-gray-700 hover:text-orange-500"
          >
            List your home
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Profile menu"
              className={
                userData
                  ? "flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
                  : "flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 text-gray-600 hover:text-orange-500 hover:border-orange-500"
              }
            >
              {userData ? (
                userData.name?.charAt(0).toUpperCase()
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                {menuItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                    {item.action ? (
                      <button
                        type="button"
                        onClick={item.action}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                      >
                        {item.label}
                      </Link>
                    )}
                    {index === 0 && <hr className="my-2 border-gray-200" />}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 min-[480px]:hidden">
        <div className="flex w-full items-center gap-2 rounded-full border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
          <Search className="w-4 h-4 text-orange-400 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search destinations"
            className="w-full outline-none text-sm text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 overflow-x-auto overflow-y-hidden mt-3 pt-2 border-t border-gray-200">
        {categories.map(({ label, icon: Icon }) => {
          const isActive = activeCategory === label
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveCategory(label)}
              className={`flex flex-col items-center gap-1 shrink-0 border-b-2 pb-1 -mb-1 transition-colors ${
                isActive
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent hover:text-orange-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[11px] font-bold whitespace-nowrap">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default NavBar
