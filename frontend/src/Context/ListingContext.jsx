import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { AuthDataContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'

export const ListingDataContext = createContext()

function ListingContext({ children }) {
  const navigate=useNavigate()
  const { serverUrl } = useContext(AuthDataContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [frontendimage1, setfrontendImage1] = useState(null)
  const [frontendimage2, setfrontendImage2] = useState(null)
  const [frontendimage3, setfrontendImage3] = useState(null)
  const [backendimage1, setbackendImage1] = useState(null)
  const [backendimage2, setbackendImage2] = useState(null)
  const [backendimage3, setbackendImage3] = useState(null)
  const [rent, setRent] = useState('')
  const [city, setCity] = useState('')
  const [landMark, setLandMark] = useState('')
  const [category, setCategory] = useState('')
  const [adding, setAdding] = useState(false)
  const [listingData, setListingData] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [viewCardData, setViewCardData] = useState(null)

  const getListing = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/listing/all`, {
        withCredentials: true,
      })
      setListingData(result.data)
    } catch (error) {
      console.error('Error fetching listings:', error)
    }
  }

  const handleViewCard = async (id) => {
    try {
      const result = await axios.get(`${serverUrl}/api/listing/findlistingbyid/${id}`, {
        withCredentials: true,
      })
      setViewCardData(result.data)
    } catch (error) {
      console.error('Error fetching listing:', error)
    }
  }

  const handleAddListing = async () => {
    try {
      setAdding(true)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image1', backendimage1)
      formData.append('image2', backendimage2)
      formData.append('image3', backendimage3)
      formData.append('rent', rent)
      formData.append('city', city)
      formData.append('landMark', landMark)
      formData.append('category', category)

      const result = await axios.post(`${serverUrl}/api/listing/add`, formData, {
        withCredentials: true,
      })
      setAdding(false)
      console.log(result)
      navigate('/')

      setTitle('')
      setDescription('')
      setfrontendImage1(null)
      setfrontendImage2(null)
      setfrontendImage3(null)
      setbackendImage1(null)
      setbackendImage2(null)
      setbackendImage3(null)
      setRent('')
      setCity('')
      setLandMark('')
      setCategory('')

      
    } catch (error) {
      setAdding(false)
      console.error('Error adding listing:', error)
      console.log(error)
    }
  }

  const value = {
    title,setTitle,
    description,setDescription,
    frontendimage1,setfrontendImage1,
    frontendimage2,setfrontendImage2,
    frontendimage3,setfrontendImage3,
    backendimage1,setbackendImage1,
    backendimage2,setbackendImage2,
    backendimage3,setbackendImage3,
    rent,setRent,
    city,setCity,
    landMark,setLandMark,
    category,setCategory,
    adding,setAdding,
    listingData,setListingData,
    activeCategory,setActiveCategory,
    viewCardData,setViewCardData,
    handleAddListing,
    getListing,
    handleViewCard,
  }

  return (
    <ListingDataContext.Provider value={value}>
      {children}
    </ListingDataContext.Provider>
  )
}

export default ListingContext
