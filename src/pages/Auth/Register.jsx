import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { NavLink, useNavigate } from 'react-router-dom'

import authAPI from '~/api/authAPI'

function Register() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [error, setError] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setisLoading(true)

    try {
      await authAPI.signUp({ userName, email, password, passwordConfirm })
      navigate('/login')
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setisLoading(false)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '20vw', margin: '0 auto' }}>
        <Typography sx={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', margin: '30px 0' }}>Sign Up</Typography>
        <TextField id='outlined-multiline-flexible' label='Username' value={userName} onChange={(e) => setUserName(e.target.value)} />

        <TextField id='outlined-multiline-flexible' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField id='outlined-multiline-flexible' label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField id='outlined-multiline-flexible' label='Confirm Password' type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        <Button sx={{ borderRadius: '4px' }} variant='contained' onClick={handleRegister}>
          {isLoading && <i className='me-2 fa-solid fa-circle-notch fa-spin'></i>}
          Register
        </Button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <p style={{ textAlign: 'center' }}>
          <NavLink to='/login'>Do you have an account?</NavLink>
        </p>
      </Box>
    </>
  )
}

export default Register
