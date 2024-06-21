import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'

function Profile() {
  const { currentUser } = useContext(AuthContext)
  return (
    <>
      <Container disableGutters>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '70%' }}>
            <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600', marginTop: '1rem' }}>USER INFORMATION</p>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', gap: 3 }}>
                <TextField id='outlined-multiline-flexible' label='User Name' value={currentUser.userName} />
                <TextField id='outlined-multiline-flexible' label='Email' value={currentUser.email} />
                <TextField id='outlined-multiline-flexible' label='Role' value={currentUser.role} />
                <Box className='d-flex'>
                  <Avatar alt='' src={currentUser.avatar || '/no-avatar.png'} sx={{ width: '50px', height: '50px', marginRight: 2 }} />
                  <Button
                    startIcon={<CloudUploadOutlinedIcon />}
                    variant='contained'
                    disableElevation
                    sx={{ backgroundColor: '#3f73d2', color: 'white', borderRadius: '6px', '&:hover': { backgroundColor: '#3f73d2' } }}
                  >
                    Choose Image
                  </Button>
                </Box>
                <Button variant='contained' disableElevation>
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '30%' }}>
            <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600', marginTop: '1rem' }}>MESSAGE</p>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Profile
