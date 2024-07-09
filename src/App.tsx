import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './features/auth/auth-provider/AuthProvider'
import MainRouter from './routes/MainRouter'

function App() {
  return (
    <>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </>
  )
}

export default App
