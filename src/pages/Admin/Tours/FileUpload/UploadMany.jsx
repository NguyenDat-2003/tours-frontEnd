import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload, message } from 'antd'
import { useState } from 'react'

function UploadMany({ fileList, setFileList }) {
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const beforeUpload = (file) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      message.error(`${file.name} is not a valid image type`, 2)
      return null
    }
    if (['image/jpeg', 'image/png'].includes(file.type) && file.size / 1024 / 1024 > 2) {
      message.error('Image must smaller than 2MB!')
      return null
    }
    return false
  }

  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList.filter((file) => file.status !== 'error'))
  }

  const handleRemove = (file) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)

    setFileList(newFileList)
  }

  const uploadFileListButton = (
    <button
      style={{
        border: 0,
        background: 'none'
      }}
      type='button'
    >
      <PlusOutlined />
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
    <>
      <Upload
        action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleFileListChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 8 ? null : uploadFileListButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none'
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </>
  )
}

export default UploadMany
