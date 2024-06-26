import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '~/context/AuthContext'
import authAPI from '~/api/authAPI'

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [error, setError] = useState('')

  const { currentUser, updateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    try {
      await authAPI.logOut()
      updateUser(null)
      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton onClick={handleClick} size='small' aria-controls={open ? 'account-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
            <Avatar sx={{ width: 40, height: 40 }} alt='' src={currentUser.avatar}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NavLink to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBoxOutlinedIcon fontSize='small' />
            </ListItemIcon>
            Profile
          </MenuItem>
        </NavLink>
        {currentUser.role == 'admin' && (
          <NavLink to='/admin/tours' style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize='small' />
              </ListItemIcon>
              Admin Page
            </MenuItem>
          </NavLink>
        )}

        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
