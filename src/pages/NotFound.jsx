import { Image, Typography } from 'antd'

export default function NotFound() {
  return (
    <div style={{ position: 'relative' }}>
      <Image preview={false} src='/vector-4k.jpg' style={{ height: '100vh', width: '100vw', objectFit: 'cover' }}></Image>
      <Typography.Title style={{ textAlign: 'center', width: '100%', color: 'red', position: 'absolute', top: '8%' }}>404. Page not found!</Typography.Title>
    </div>
  )
}
