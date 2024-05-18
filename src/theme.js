import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { teal } from '@mui/material/colors'

const NAV_HEIGHT = '96px'

// Create a theme instance.
const theme = extendTheme({
  tours: {
    headerBarheight: NAV_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#77dada'
        }
      }
    },
    dark: {
      palette: {
        primary: teal
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '50px',
          padding: '8px 16px',
          '&:hover': { color: 'white' }
        }
      }
    }
  }
})

export default theme
