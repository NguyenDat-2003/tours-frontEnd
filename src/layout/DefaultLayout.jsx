import { Box } from '@mui/material'
import Header from '~/components/Header/Header'

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Box>{children}</Box>
    </>
  )
}

export default DefaultLayout
