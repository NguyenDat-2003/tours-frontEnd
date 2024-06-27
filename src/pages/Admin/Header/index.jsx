import { Image, Typography } from 'antd'
function Header() {
  return (
    <>
      <div
        style={{
          height: '80px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '4px 20px 4px 12px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.15)'
        }}
      >
        <div style={{ flexBasis: '40%' }}>
          <Image width={40} src='https://yt3.ggpht.com/ytc/AMLnZu83ghQ28n1SqADR-RbI2BGYTrqqThAtJbfv9jcq=s176-c-k-c0x00ffffff-no-rj'></Image>
          <Typography.Text style={{ marginLeft: '6px', fontSize: '16px' }}>
            Welcom <b>Admin</b>
          </Typography.Text>
        </div>
        <Typography.Title style={{ margin: '0' }}>Admin Dashboard</Typography.Title>
      </div>
    </>
  )
}

export default Header
