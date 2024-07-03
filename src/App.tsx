import './App.css'
import { AuthProvider } from './features/auth/auth-provider/AuthProvider'
import MainRouter from './routes/MainRouter'

function App() {

  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  )
}

export default App
