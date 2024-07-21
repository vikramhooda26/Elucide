import './App.css'
import { AuthProvider } from './features/auth/auth-provider/AuthProvider'
import { ThemeProvider } from './provider/theme/theme-provider'
import MainRouter from './routes/MainRouter'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
