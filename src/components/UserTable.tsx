import React, { useMemo, useState } from 'react'
import { Space, Table, Pagination, Row, Col, Layout, Button, Input } from 'antd'
import { User, Users } from '../types/User'

const { Header, Content, Footer } = Layout
const { Search } = Input

const Columns = (onDelete: (userId: number) => void) => ([
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Action',
    render: (_: any, record: User) => (
      <Space size="middle">
        <a onClick={() => onDelete(record.id)}>Delete</a>
      </Space>
    ),
  },
])

const UserTable = ({ data, pageSize, totalPages, handlePageChange, isDeletingBulk, handleBulkDelete, handleRecordDelete, setSearchTerm }: { data: Users } & any) => { 
  const tableData = data.map((record: any) => Object.assign({...record}, { key: record.id }))

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const tableSelectedKeys = useMemo(() => {
    const currentTableKeys = tableData.map((record: any) => record.key)
    return selectedRowKeys.filter(selectedKey => currentTableKeys.includes(selectedKey))
  }, [selectedRowKeys, tableData])

  const rowSelection = {
    selectedRowKeys: tableSelectedKeys,
    onChange: onSelectChange,
  }

  const showDeleteSelectedButton = Boolean(tableSelectedKeys.length)

  return <Layout style={{minWidth: '750px'}} >
    <Header style={{ display: 'flex', alignItems: 'center' }} >
      <Row style={{width: '100%'}} >
        <Search size='large' enterButton onSearch={setSearchTerm}/>
      </Row>
    </Header>
    <Content style={{padding: "20px", minHeight: '650px'}} >
      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={22}>
          <Table size='large' sticky rowSelection={rowSelection} pagination={false} columns={Columns(handleRecordDelete)} dataSource={tableData} />
        </Col>
      </Row>
    </Content>
    <Footer style={{marginBottom: '50px'}}>
      <Row style={{alignItems: "center", justifyContent: "center"}} >
        <Col span={4}>
          {showDeleteSelectedButton ? <Button onClick={() => handleBulkDelete(tableSelectedKeys)} loading={isDeletingBulk} danger type='primary' > Delete Selected </Button> : null}
        </Col>
        <Col span={18} style={{alignItems: "center"}}>
          <Pagination style={{float: "right"}}  onChange={handlePageChange} pageSize={pageSize} total={totalPages*pageSize} />
        </Col>
      </Row>
    </Footer>
  </Layout>
}

export default UserTable
