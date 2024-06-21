import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Box } from '@mui/material'

import Header from '~/components/Header/Header'
import { AuthContext } from '~/context/AuthContext'

function RequireLayout({ children }) {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    return <Navigate to='/login' />
  }
  return (
    currentUser && (
      <>
        <Header />
        <Box>{children}</Box>
      </>
    )
  )
}

export default RequireLayout
