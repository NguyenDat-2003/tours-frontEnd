import { Typography } from 'antd'

function Footer() {
  return (
    <>
      <div
        style={{
          height: '50px',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '4px 20px 4px 12px',
          borderTop: '1px solid rgba(0, 0, 0, 0.15)'
        }}
      >
        <Typography.Link href='tel:+123456789'>+123456789</Typography.Link>
        <Typography.Link href='https://www.google.com' target={'_blank'}>
          Privacy Policy
        </Typography.Link>
        <Typography.Link href='https://www.google.com' target={'_blank'}>
          Terms of Use
        </Typography.Link>
      </div>
    </>
  )
}

export default Footer
