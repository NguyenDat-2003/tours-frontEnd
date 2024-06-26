import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'

import LogoMain from '~/assets/images/logo-main.png'
import ProfileMenu from './Menus/ProfileMenu'
import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'

function Header() {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <Box sx={{ height: (theme) => theme.tours.headerBarheight, width: '100%', borderBottom: '1px solid #eaecf0' }}>
        <Container disableGutters sx={{ height: '100%' }}>
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
              <Box sx={{ width: '144px', height: '50%' }}>
                <NavLink sx={{ height: '100%', display: 'block' }} to='/'>
                  <img src={LogoMain} style={{ height: '100%', width: '70%' }} alt='' />
                </NavLink>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  gap: 4,
                  alignItems: 'center',
                  '& a': {
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#101828',
                    fontWeight: '500',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                    '&.active': { borderBottom: '2px solid #77dada' }
                  }
                }}
              >
                <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to='/find-tour'>
                  Find tour
                </NavLink>
                <NavLink to='/enterprise'>Enterprise</NavLink>
                <NavLink to='/blog'>Blog</NavLink>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', height: '100%', gap: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', fontWeight: '600' }}>
                <LocalPhoneIcon />
                <span>Hotline: 0987742553</span>
              </Box>
              <Button variant='contained' disableElevation>
                Contact Us
              </Button>

              {currentUser ? (
                <ProfileMenu />
              ) : (
                <Button variant='contained' disableElevation>
                  <NavLink style={{ color: '#101828', fontWeight: '500', textDecoration: 'none' }} to='/login'>
                    Log In
                  </NavLink>
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Header
