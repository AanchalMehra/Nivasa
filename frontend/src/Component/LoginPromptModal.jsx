import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { AuthDataContext } from '../Context/AuthContext'

function LoginPromptModal() {
  const navigate = useNavigate()
  const { showLoginPrompt, setShowLoginPrompt } = useContext(AuthDataContext)

  if (!showLoginPrompt) {
    return null
  }

  const close = () => setShowLoginPrompt(false)

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 text-center"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-50">
          <LogIn className="w-7 h-7 text-orange-500" />
        </div>
        <h3 className="text-base font-semibold text-gray-900">Log in to continue</h3>
        <p className="text-sm text-gray-600">
          You need to be logged in to view listings, book a stay, or manage your account.
        </p>
        <div className="w-full flex gap-3">
          <button
            type="button"
            onClick={close}
            className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              close()
              navigate('/login')
            }}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 text-sm font-medium"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPromptModal
