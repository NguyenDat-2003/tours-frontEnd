import { useEffect, useState } from 'react'
import { Table, Rate, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import tourAPI from '~/api/tourAPI'

function AdminTours() {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)

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
      <Table
        style={{ padding: '10px', width: '100%' }}
        columns={columns}
        dataSource={dataSource}
        // onChange={onChange}
        pagination={{
          pageSize: 1
        }}
        loading={loading}
      />
    </>
  )
}

export default AdminTours
