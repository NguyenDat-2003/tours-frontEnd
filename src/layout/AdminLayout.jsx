import Header from '~/pages/Admin/Header'
import Footer from '~/pages/Admin/Footer'
import SideMenu from '~/pages/Admin/SideMenu'
import { Outlet } from 'react-router-dom'
import { Padding } from '@mui/icons-material'

function AdminLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: '1', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <SideMenu />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout
