import { Button, Input, Modal, Form, Col, Row, InputNumber } from 'antd'
import UploadOne from '../FileUpload/UploadOne'
import UploadMany from '../FileUpload/UploadMany'

function ModalAddNewTour({ isModalOpen, name, setName, imageUrl, setImageUrl, setImageCoverObj, isCreate, handleOk, handleCancel, handleSubmit, fileList, setFileList }) {
  return (
    <>
      <Modal
        title='Add new Tour'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
          </>
        )}
      >
        <Form onFinish={handleSubmit} layout='vertical'>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name='name'
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: 'Please enter tour name'
                  },
                  { whitespace: true, message: 'Name cannot be empty' }
                ]}
                hasFeedback
              >
                <Input placeholder='Name' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='duration'
                label='Duration'
                rules={[
                  {
                    required: true,
                    message: 'Please enter duration'
                  }
                ]}
                hasFeedback
              >
                <InputNumber style={{ width: '100%' }} min={0} placeholder='Duration' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='maxGroupSize'
                label='Max Group'
                rules={[
                  {
                    required: true,
                    message: 'Please enter group size'
                  }
                ]}
                hasFeedback
              >
                <InputNumber style={{ width: '100%' }} min={0} placeholder='Max Group' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='imageCover' label='Image Cover'>
                <UploadOne imageUrl={imageUrl} setImageUrl={setImageUrl} setImageCoverObj={setImageCoverObj} />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                name='summary'
                label='Summary'
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='difficulty'
                label='Difficulty'
                rules={[
                  {
                    required: true,
                    message: 'Please enter difficulty'
                  }
                ]}
                hasFeedback
              >
                <Input placeholder='Difficulty' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='price'
                label='Price'
                rules={[
                  {
                    required: true,
                    message: 'Please enter price'
                  }
                ]}
                hasFeedback
              >
                <InputNumber style={{ width: '100%' }} min={0} placeholder='Price' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='priceDiscount' label='Price Discount'>
                <Input placeholder='Price Discount' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name='images' label='Images'>
                <UploadMany fileList={fileList} setFileList={setFileList} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                {isCreate ? (
                  <Button shape='round' type='primary' htmlType='submit' disabled>
                    Submit
                  </Button>
                ) : (
                  <Button shape='round' type='primary' htmlType='submit'>
                    Submit
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default ModalAddNewTour
