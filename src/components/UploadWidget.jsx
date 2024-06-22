import { Button } from '@mui/material'
import { createContext, useEffect, useState } from 'react'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext()

function UploadWidget({ uwConfig, setPublicId, setAvatar }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw')
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script')
        script.setAttribute('async', '')
        script.setAttribute('id', 'uw')
        script.src = 'https://upload-widget.cloudinary.com/global/all.js'
        script.addEventListener('load', () => setLoaded(true))
        document.body.appendChild(script)
      } else {
        // If already loaded, update the state
        setLoaded(true)
      }
    }
  }, [loaded])

  const initializeCloudinaryWidget = (e) => {
    e.preventDefault()
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
        if (!error && result && result.event === 'success') {
          setAvatar(result.info.secure_url)
        }
      })

      document.getElementById('upload_widget').addEventListener(
        'click',
        function () {
          myWidget.open()
        },
        false
      )
    }
  }

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        id='upload_widget'
        startIcon={<CloudUploadOutlinedIcon />}
        variant='contained'
        disableElevation
        sx={{ backgroundColor: '#3f73d2', color: 'white', borderRadius: '6px', '&:hover': { backgroundColor: '#3f73d2', '&:hover': { backgroundColor: '#3f73d2' } } }}
        onClick={initializeCloudinaryWidget}
      >
        Choose Image
      </Button>
    </CloudinaryScriptContext.Provider>
  )
}

export default UploadWidget
export { CloudinaryScriptContext }
