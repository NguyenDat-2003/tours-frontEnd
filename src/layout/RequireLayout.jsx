import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Header from '~/components/Header/Header'
import { AuthContext } from '~/context/AuthContext'

function RequireLayout() {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    return <Navigate to='/login' />
  } else {
    return (
      <>
        <Header />
        <Box>
          <Outlet />
        </Box>
      </>
    )
  }
}

export default RequireLayout
