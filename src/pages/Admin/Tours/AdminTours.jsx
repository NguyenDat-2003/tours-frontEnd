import { useEffect, useState } from 'react'
import { Table, Rate, Space, Button, Input, Modal, Form, Col, Row, InputNumber, message } from 'antd'
import { EditOutlined, DeleteOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
const { Search } = Input

import tourAPI from '~/api/tourAPI'
import './AdminTours.scss'
import app from '~/components/firebaseUpload.js'
import UploadOne from './FileUpload/UploadOne'
import UploadMany from './FileUpload/UploadMany'

function AdminTours() {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('false')
  const [fileList, setFileList] = useState([])

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCreate = async () => {
    let imagesFile = []
    try {
      await Promise.all(
        fileList.map(async (file) => {
          // const fileName = `uploads/images/${Date.now()}-${file.name}`
          // const fileRef = storageRef.child(fileName)
          try {
            const storage = getStorage(app)
            const storageRef = ref(storage, `images/${file.name}-${Date.now()}`)
            await uploadBytes(storageRef, file)
            const url = await getDownloadURL(storageRef)
            imagesFile.push(url)
          } catch (e) {
            throw new Error(e)
          }
        })
      )

      // Hanle Create tour

      setFileList([])
      message.success('Successfully')
    } catch (error) {
      message.error('Error adding images.')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Start Location',
      dataIndex: 'startLocation',
      render: (value) => {
        return <span>{value.address}</span>
      }
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty'
    },
    {
      title: 'Group Size',
      dataIndex: 'maxGroupSize',
      render: (value) => {
        return <span>{value} people</span>
      }
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (value) => {
        return <span>{value} day</span>
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      render: (value) => {
        return <span>$ {value}</span>
      }
    },
    {
      title: 'Rating',
      dataIndex: 'ratingsAverage',
      render: (rating) => {
        return <Rate disabled value={rating} allowHalf />
      }
    },

    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: () => {
        return (
          <Space>
            <EditOutlined style={{ color: '#fadb14', fontSize: '16px', padding: '4px', cursor: 'pointer' }} />
            <DeleteOutlined style={{ color: 'red', fontSize: '16px', padding: '4px', cursor: 'pointer' }} />
          </Space>
        )
      }
    }
  ]

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await tourAPI.getAllTours()
        setDataSource(res)
      } catch (err) {
        throw new Error(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <>
      <div style={{ flex: '1', padding: '10px' }}>
        <div style={{ padding: '10px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <MenuUnfoldOutlined />
          <Search
            placeholder='search tour'
            allowClear
            style={{
              width: 400
            }}
          />
          <Button type='primary' onClick={showModal}>
            Add Tour
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          // onChange={onChange}
          pagination={{
            pageSize: 1
          }}
          loading={loading}
        />
      </div>
      <Modal
        title='Add new Tour'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <Button type='primary' onClick={handleCreate} htmlType='submit'>
              Create Tour
            </Button>
            <CancelBtn />
          </>
        )}
      >
        <Form layout='vertical'>
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
              <Form.Item
                name='imageCover'
                label='Image Cover'
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <UploadOne />
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
            <Col span={16}>
              <Form.Item
                label='Images'
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <UploadMany fileList={fileList} setFileList={setFileList} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default AdminTours
