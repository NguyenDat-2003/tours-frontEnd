import React from 'react'
import ReactDOM from 'react-dom/client'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App.jsx'
import theme from '~/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </CssVarsProvider>
)
