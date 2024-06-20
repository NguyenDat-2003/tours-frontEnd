import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setisLoading(true)

    try {
      await axios.post('http://localhost:8080/v1/users/signup', { userName, email, password, passwordConfirm })
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

        <FormControl variant='outlined'>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel>Password Confirm</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password Confirm'
          />
        </FormControl>
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
