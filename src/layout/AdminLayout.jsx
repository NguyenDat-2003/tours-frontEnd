import Header from '~/pages/Admin/Header'
import Footer from '~/pages/Admin/Footer'
import SideMenu from '~/pages/Admin/SideMenu'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'
import { Image, Typography } from 'antd'

function AdminLayout() {
  const { currentUser } = useContext(AuthContext)
  if (currentUser.role !== 'admin') {
    return (
      <>
        <div style={{ position: 'relative' }}>
          <Image preview={false} src='/vector-4k.jpg' style={{ height: '100vh', width: '100vw', objectFit: 'cover' }}></Image>
          <Typography.Title style={{ textAlign: 'center', width: '100%', color: 'red', position: 'absolute', top: '8%' }}>
            Sorry! You do not have permission to access this route{' '}
          </Typography.Title>
        </div>
      </>
    )
  } else {
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
}

export default AdminLayout
