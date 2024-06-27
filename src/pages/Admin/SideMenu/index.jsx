import { Menu } from 'antd'
import { AppstoreOutlined, UserOutlined, AliwangwangOutlined, HomeOutlined, WechatWorkOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

function SideMenu() {
  const navigate = useNavigate()
  const items = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home'
    },
    {
      key: 'admin/tours',
      icon: <AppstoreOutlined />,
      label: 'Tours'
    },
    {
      key: 'admin/users',
      icon: <UserOutlined />,
      label: 'Users'
    },
    {
      key: 'admin/bookings',
      icon: <AliwangwangOutlined />,
      label: 'Booking'
    },
    {
      key: 'admin/reviews',
      icon: <WechatWorkOutlined />,
      label: 'Review'
    }
  ]
  return (
    <>
      <Menu
        style={{ height: '100%', flexBasis: '15%' }}
        items={items}
        onClick={(item) => {
          navigate(item.key)
        }}
      ></Menu>
    </>
  )
}

export default SideMenu
