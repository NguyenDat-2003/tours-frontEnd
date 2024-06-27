import { Avatar, Typography } from 'antd'
import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'

function Header() {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <div
        style={{
          height: '80px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '4px 20px 4px 12px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.15)'
        }}
      >
        <div style={{ flexBasis: '40%' }}>
          <Avatar src={currentUser.avatar || '/no-avatar.png'} style={{ height: '40px', width: '40px' }}></Avatar>
          <Typography.Text style={{ marginLeft: '6px', fontSize: '16px' }}>
            Welcom <b>{currentUser.userName}</b>
          </Typography.Text>
        </div>
        <Typography.Title style={{ margin: '0' }}>Admin Dashboard</Typography.Title>
      </div>
    </>
  )
}

export default Header
