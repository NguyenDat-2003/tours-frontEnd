import ReactDOM from 'react-dom/client'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App.jsx'
import theme from '~/theme.js'
import { AuthContextProvider } from '~/context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </CssVarsProvider>
)
