import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import authservice_obj from './appwrite/auth'
import { login, logout } from './features/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice_obj.currentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='flex min-h-screen flex-col text-slate-900'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
