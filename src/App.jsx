import { useState } from 'react'
import { AppProvider } from './assets/components/AppContext'
import { useAppContext } from './assets/components/AppContext'
import { Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import AppNavbar from './assets/components/AppNavbar'
import About from './assets/pages/About'
import Contact from './assets/pages/Contact'
import Reviews from './assets/pages/Reviews'
import Login from './assets/pages/Login'
import AdminDashboard from './assets/pages/AdminDashboard'
import ErrorPage from './assets/pages/ErrorPage'
import ProtectedRoute from './assets/components/ProtectedRoute'
import CreateReview from './assets/pages/CreateReview'


function App() {

  return (
    <>
      <div>
        <AppNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin-dashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path='/create-review' element={<CreateReview />} />


          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>


    </>
  )
}

export default App
