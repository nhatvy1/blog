import { IUser } from '@/types/user.type'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { toast } from 'react-toastify'

interface Props {
  selectedUser: IUser | null | undefined
  isOpen: boolean
  onClose: () => void
}

const DeleteUser = ({ isOpen, selectedUser, onClose }: Props) => {

  const handleDelete = () => {
    try {
      if (selectedUser) {
        // deleteUser(selectedUser._id)
      } else {
        toast.error('Không tim thấy user')
      }
    } catch (e) {
      console.log(e)
    } finally {
      onClose()
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Xóa user
            </ModalHeader>
            <ModalBody>
              Bạn có chắc chắn xóa user:
              <span className='font-bold'>{selectedUser?.email}</span>
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                className='!scale-100'
                radius='sm'
                onPress={onClose}
              >
                Đóng
              </Button>
              <Button
                color='primary'
                className='!scale-100'
                radius='sm'
                onPress={handleDelete}
              >
                Đồng ý
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DeleteUser
