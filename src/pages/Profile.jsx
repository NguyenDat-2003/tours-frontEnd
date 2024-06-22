import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useContext, useState } from 'react'

import { AuthContext } from '~/context/AuthContext'
import userAPI from '~/api/userAPI'
import UploadWidget from '~/components/UploadWidget'

function Profile() {
  const { currentUser, updateUser, error, setError } = useContext(AuthContext)
  const [isLoading, setisLoading] = useState(false)

  const [userName, setUserName] = useState(currentUser.userName)
  const [email, setEmail] = useState(currentUser.email)
  const [avatar, setAvatar] = useState(currentUser.avatar)

  const hadleSave = async (e) => {
    e.preventDefault()
    setisLoading(true)

    try {
      const res = await userAPI.updateMe({
        userName,
        email,
        avatar
      })
      updateUser(res)
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setisLoading(false)
    }
  }
  return (
    <>
      <Container disableGutters>
        <Box sx={{ display: 'flex', paddingBottom: 6 }}>
          <Box sx={{ width: '70%' }}>
            <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600', marginTop: '1rem' }}>USER INFORMATION</p>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', gap: 3 }}>
                <TextField id='outlined-multiline-flexible' label='User Name' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <TextField id='outlined-multiline-flexible' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Box className='d-flex'>
                  <Avatar alt='' sx={{ width: '50px', height: '50px', marginRight: 2 }} src={avatar} />
                  <UploadWidget
                    uwConfig={{
                      cloudName: 'datdev',
                      uploadPreset: 'tours-app',
                      multiple: false,
                      maxImageFileSize: 2000000,
                      folders: 'avatars'
                    }}
                    setAvatar={setAvatar}
                  />
                </Box>
                {error && <span style={{ color: 'red' }}>{error}</span>}
                <Button variant='contained' disableElevation onClick={hadleSave}>
                  {isLoading && <i className='me-2 fa-solid fa-circle-notch fa-spin'></i>}
                  Save
                </Button>
              </Box>
            </Box>
            <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600', marginTop: '8rem' }}>PASSWORD CHANGE</p>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', gap: 3 }}>
                <TextField id='outlined-multiline-flexible' label='Current Password' type='password' />
                <TextField id='outlined-multiline-flexible' label='New Password' type='password' />
                <TextField id='outlined-multiline-flexible' label='Confirm Password' type='password' />
                <Button variant='contained' disableElevation>
                  Save Password
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
