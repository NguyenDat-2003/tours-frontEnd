import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header/Header'

function DefaultLayout() {
  return (
    <>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </>
  )
}

export default DefaultLayout
