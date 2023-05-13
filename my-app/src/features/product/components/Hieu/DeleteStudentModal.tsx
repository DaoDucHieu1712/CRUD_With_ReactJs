import { Button, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import StudentApi from '../../../../api/Hieu/StudentApi'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { type } from 'os'

interface DeleteStudentModalProps {
  id: string
  name: string
  onLoad: () => Promise<void>
}

const DeleteStudentModalStyle = styled.div`
  .abc {
    font-size: 18px;
    color: yellowgreen;
    font-weight: 500;
  }
`

const DeleteStudentModal = ({ id, name, onLoad }: DeleteStudentModalProps) => {
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const confirm = async (id: string) => {
    StudentApi.delete(id).then(res => {
      onLoad()
      toast.success(res)
    })
  }

  return (
    <DeleteStudentModalStyle>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fff',
            colorBgContainer: '#ff4d4f',
            colorText: '#FFF'
          }
        }}
      >
        <Button onClick={showModal}>Delete</Button>
      </ConfigProvider>
      <Modal
        title="Delete Student"
        open={open}
        onOk={() => confirm(id)}
        onCancel={hideModal}
        okText="Yes"
        cancelText="No"
      >
        <p>
          Do you want to delete <span className="abc">{name}</span>
        </p>
      </Modal>
    </DeleteStudentModalStyle>
  )
}

export default DeleteStudentModal
