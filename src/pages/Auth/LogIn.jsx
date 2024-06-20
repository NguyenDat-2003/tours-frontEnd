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

function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleLogin = () => {}

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
        <Button sx={{ borderRadius: '4px' }} variant='contained' onClick={handleLogin}>
          Log In
        </Button>
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
