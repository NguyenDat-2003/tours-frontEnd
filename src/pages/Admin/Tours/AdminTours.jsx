import { useEffect, useState } from 'react'
import { Table, Rate, Space, Button, Input, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, MenuUnfoldOutlined, ExclamationCircleFilled } from '@ant-design/icons'
const { Search } = Input
const { confirm } = Modal

import tourAPI from '~/api/tourAPI'
import './AdminTours.scss'

import changeNameImageToFireBase from '~/utils/changeNameImageToFireBase'
import ModalAddNewTour from './ModalAddNewTour/ModalAddNewTour'

function AdminTours() {
  const [dataSource, setDataSource] = useState([])
  const [fileList, setFileList] = useState([])
  const [imageCoverObj, setImageCoverObj] = useState({})

  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreate, setIsCreate] = useState(false)

  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this tour?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        ;(async () => {
          try {
            const res = await tourAPI.deleteTour(id)
            setDataSource(dataSource.filter((data) => data._id !== id))
            message.success(res.delete)
          } catch (error) {
            message.error(error.response.data.message)
          }
        })()
      },
      onCancel() {}
    })
  }

  const handleSubmit = async (values) => {
    setIsCreate(true)
    let imagesFile = []
    try {
      // URL IMG COVER
      const url = await changeNameImageToFireBase(imageCoverObj, 'imageCover')

      // URL LIST IMAGES
      await Promise.all(
        fileList.map(async (file) => {
          try {
            const url = await changeNameImageToFireBase(file, 'images')
            imagesFile.push(url)
          } catch (e) {
            throw new Error(e)
          }
          setFileList([])
        })
      )
      const newTour = {
        ...values,
        imageCover: url,
        images: imagesFile
      }

      const res = await tourAPI.createTour(newTour)
      setDataSource([...dataSource, res])
      message.success('Create successfully!')
    } catch (error) {
      message.error(error.response.data.message)
    } finally {
      setIsCreate(false)
      setIsModalOpen(false)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
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
      dataIndex: '_id',
      render: (id) => {
        return (
          <Space>
            <EditOutlined style={{ color: '#fadb14', fontSize: '16px', padding: '4px', cursor: 'pointer' }} />
            <DeleteOutlined onClick={() => showDeleteConfirm(id)} style={{ color: 'red', fontSize: '16px', padding: '4px', cursor: 'pointer' }} />
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
        message.error(err.response.data.message)
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
          pagination={{
            pageSize: 2
          }}
          loading={loading}
        />
      </div>
      <ModalAddNewTour
        isModalOpen={isModalOpen}
        name={name}
        setName={setName}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        setImageCoverObj={setImageCoverObj}
        isCreate={isCreate}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        fileList={fileList}
        setFileList={setFileList}
      />
    </>
  )
}

export default AdminTours
