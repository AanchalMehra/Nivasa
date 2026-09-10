import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthDataContext } from '../Context/AuthContext'

function SignUp() {
  const { serverUrl } = useContext(AuthDataContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error('All fields are required')
      return
    }

    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      )
      toast.success(result.data?.message || 'Account created successfully')
      navigate('/')
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.error || error.response.data?.message || 'Something went wrong')
      } else if (error.request) {
        toast.error('Unable to reach the server. Please try again later.')
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 bg-white">
      <Link
        to="/"
        aria-label="Back to home"
        className="absolute top-4 left-4 text-gray-500 hover:text-orange-500"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8">
        <div className="mb-4">
          <p className="text-xl font-bold text-center text-orange-500">
            Welcome to Nivasa!
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5 text-left">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 text-left"
            >
              Username
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
              <User className="w-4 h-4 text-orange-400 shrink-0" />
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 text-left"
            >
              Email
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
              <Mail className="w-4 h-4 text-orange-400 shrink-0" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 text-left"
            >
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
              <Lock className="w-4 h-4 text-orange-400 shrink-0" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="shrink-0 text-gray-400 hover:text-orange-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
