import { Box, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

function Tours() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '40px', gap: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: '500' }}>
            Bạn lựa chọn Tour nào?
          </Typography>
          <p style={{ color: '#93979e', fontSize: '1.2rem' }}>Hơn 100 TOur giá tốt đang chờ bạn</p>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            placeholder='Nhập tên Tour'
            id='outlined-start-adornment'
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#eaecf0',
                  borderRadius: '28px'
                },
                '&:hover fieldset': {
                  borderColor: '#eaecf0'
                },
                '&.Mui-focused fieldset': {
                  border: '1px solid transparent',
                  borderColor: (theme) => theme.primary,
                  boxShadow: (theme) => `0px 0px 0px 4px ${theme.palette.primary.light}`
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <p>kkkkkkkkkk</p>
        </Box>
      </Box>
    </>
  )
}

export default Tours
