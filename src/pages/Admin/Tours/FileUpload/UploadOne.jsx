import { Upload, message } from 'antd'
import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import app from '~/components/firebaseUpload'

function UploadOne() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng || file.type === 'image/webp') {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (isJpgOrPng && !isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = async (e) => {
    const image = e.file
    if (e.file.status === 'uploading') {
      setLoading(true)
      const storage = getStorage(app)
      const storageRef = ref(storage, `imageCover/${image.name}-${Date.now()}`)
      await uploadBytes(storageRef, image)
      await getDownloadURL(storageRef)
      return
    }
    // Get this url from response in real world.
    getBase64(image.originFileObj, (url) => {
      setLoading(false)
      setImageUrl(url)
    })
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none'
      }}
      type='button'
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </button>
  )

  return (
    <Upload
      listType='picture-card'
      className='avatar-uploader'
      showUploadList={false}
      action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : uploadButton}
    </Upload>
  )
}

export default UploadOne
