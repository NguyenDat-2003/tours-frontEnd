import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { useContext, useState } from 'react'
import { message, Upload } from 'antd'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

import { AuthContext } from '~/context/AuthContext'
import userAPI from '~/api/userAPI'
import app from '~/components/firebaseUpload.js'

function Profile() {
  const { currentUser, updateUser, error, setError } = useContext(AuthContext)
  const [isLoading, setisLoading] = useState(false)
  const [isLoadingPass, setisLoadingPass] = useState(false)

  const [userName, setUserName] = useState(currentUser.userName)
  const [email, setEmail] = useState(currentUser.email)
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [loadingImg, setLoadingImg] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const hadleSave = async (e) => {
    e.preventDefault()
    setError('')
    setisLoading(true)

    try {
      const res = await userAPI.updateMe({
        userName,
        email,
        avatar
      })
      updateUser(res)
      message.success('Save info successfully!')
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setisLoading(false)
    }
  }

  const hadleSavePass = async (e) => {
    e.preventDefault()
    setisLoadingPass(true)

    try {
      const res = await userAPI.updatePassword({
        currentPassword,
        newPassword,
        confirmPassword
      })
      updateUser(res)
      message.success('Save pass success!')
    } catch (error) {
      message.error(error.response.data.message)
    } finally {
      setisLoadingPass(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text'
    },
    beforeUpload: (file) => {
      return new Promise((resolve, reject) => {
        if (file.size / 1024 / 1024 > 2) {
          reject('Image must smaller than 2MB!')
          message.error('Image must smaller than 2MB!')
        }
        if (file.type === 'image/webp' || !file.type == 'image/jpeg' || !file.type == 'image/png') {
          reject('You can only upload JPG/PNG file! asdasd')
          message.error('You can only upload JPG/PNG file! asdasd')
        }
        resolve('success')
      })
    },
    customRequest: async (info) => {
      setLoadingImg(true)
      const storage = getStorage(app)
      const storageRef = ref(storage, 'avatars/' + info.file.name)
      await uploadBytes(storageRef, info.file)
      const url = await getDownloadURL(storageRef)
      setAvatar(url)
      setLoadingImg(false)
    },
    showUploadList: false,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`
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
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                  {loadingImg ? <CircularProgress /> : <Avatar alt='' sx={{ width: '80px', height: '80px' }} src={avatar} />}
                  <Upload {...props}>
                    <Button
                      startIcon={<CloudUploadOutlinedIcon />}
                      sx={{ backgroundColor: '#3f73d2', color: 'white', borderRadius: '6px', marginLeft: 2, '&:hover': { backgroundColor: '#3f73d2' } }}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                  {/* <UploadWidget
                    uwConfig={{
                      cloudName: 'datdev',
                      uploadPreset: 'tours-app',
                      multiple: false,
                      maxImageFileSize: 2000000,
                      folders: 'avatars'
                    }}
                    setAvatar={setAvatar}
                  /> */}
                </Box>
                <TextField id='outlined-multiline-flexible' label='User Name' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <TextField id='outlined-multiline-flexible' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
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
                <TextField id='outlined-multiline-flexible' label='Current Password' type='password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                <TextField id='outlined-multiline-flexible' label='New Password' type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <TextField id='outlined-multiline-flexible' label='Confirm Password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button variant='contained' disableElevation onClick={hadleSavePass}>
                  {isLoadingPass && <i className='me-2 fa-solid fa-circle-notch fa-spin'></i>}
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
