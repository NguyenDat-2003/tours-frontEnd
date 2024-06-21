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
import Divider from '@mui/material/Divider'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import { NavLink, useNavigate } from 'react-router-dom'
import authAPI from '~/api/authAPI'
import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'

function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate()
  const { updateUser } = useContext(AuthContext)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setisLoading(true)

    try {
      const res = await authAPI.logIn({
        email,
        password
      })
      updateUser(res)
      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setisLoading(false)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '20vw', margin: '0 auto' }}>
        <Typography sx={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', margin: '30px 0' }}>Sign In</Typography>
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
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <Button sx={{ borderRadius: '4px' }} variant='contained' onClick={handleLogin}>
          {isLoading && <i className='me-2 fa-solid fa-circle-notch fa-spin'></i>}
          Log In
        </Button>
        <p style={{ textAlign: 'center' }}>
          Not a member? <NavLink to='/register'> Register</NavLink>
        </p>
        <Divider />
        <Button sx={{ borderRadius: '4px', backgroundColor: '#dd4b39', color: 'white', '&:hover': { backgroundColor: '#dd4b39' } }} variant='contained' startIcon={<GoogleIcon />}>
          SIGN IN with Google
        </Button>
        <Button
          sx={{ borderRadius: '4px', backgroundColor: '#455798', color: 'white', '&:hover': { backgroundColor: '#455798' } }}
          variant='contained'
          startIcon={<FacebookIcon />}
        >
          SIGN IN with Facebook
        </Button>
      </Box>
    </>
  )
}

export default LogIn
