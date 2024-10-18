import NextTable from '@/components/ui/NextTable'
import { columnsUser } from './components/data.user'
import { Key, useCallback, useEffect, useState } from 'react'
import { IUser } from '@/types/user.type'
import { Button, Tooltip } from '@nextui-org/react'
import { EditIcon } from '@/components/icons/EditIcon'
import { DeleteIcon } from '@/components/icons/DeleteIcon'
import NextInput from '@/components/ui/NextInput'
import AddEditUser from './components/AddUser'
import UpdateUser from './components/UpdateUser'
import DeleteUser from './components/DeleteUser'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getListUsers, handleSelectUser } from '@/redux/slices/user.slice'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const UserManagementPage = () => {
  const dispatch = useAppDispatch()
  const { loading, listUsers, selectedUser, totalPage } = useSelector(
    (state: RootState) => state.user
  )

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const renderCell = useCallback((user: IUser, columnKey: Key) => {
    const cellValue = user[columnKey as keyof IUser]

    switch (columnKey) {
      case 'role':
        return <p>{user.role.name}</p>
      case 'status':
        return <p>{user.status}</p>
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Edit user'>
              <span
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
                onClick={() => handleUpdate(user)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete user'>
              <span
                className='text-lg text-danger cursor-pointer active:opacity-50'
                onClick={() => handleOpenDelete(user)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const handleUpdate = (user: IUser) => {
    dispatch(handleSelectUser(user))
    setIsOpenUpdate(true)
  }

  const handleOpenAdd = () => {
    setIsOpenAdd(!isOpenAdd)
  }
  const toggleUpdate = () => {
    if (selectedUser) {
      dispatch(handleSelectUser(null))
    }
    setIsOpenUpdate(!isOpenUpdate)
  }

  const toggleDelete = () => {
    if (selectedUser) {
      dispatch(handleSelectUser(null))
    }
    setIsOpenDelete(!isOpenDelete)
  }
  const handleOpenDelete = (user: IUser) => {
    dispatch(handleSelectUser(user))
    setIsOpenDelete(true)
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }
  const handleLimitChange = async (newPerPage: number) => {
    setLimit(newPerPage)
  }

  useEffect(() => {
    const filter = `page=${page}&limit=${limit}`
    dispatch(getListUsers(filter))
  }, [page, limit])

  return (
    <div>
      <div className='flex items-center gap-3'>
        <NextInput
          placeholder='Tìm kiếm theo email, họ tên'
          className='!mt-0 max-w-[250px]'
        />
        <Button
          className='bg-primary !scale-100 text-white'
          radius='none'
          onPress={() => handleOpenAdd()}
        >
          Thêm người dùng
        </Button>
      </div>
      <NextTable
        columns={columnsUser}
        data={listUsers}
        renderCell={renderCell}
        isLoading={loading}
        totalPages={totalPage}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />

      <AddEditUser isOpen={isOpenAdd} onClose={handleOpenAdd} />

      <UpdateUser isOpen={isOpenUpdate} onClose={toggleUpdate} />

      <DeleteUser
        isOpen={isOpenDelete}
        onClose={toggleDelete}
        selectedUser={selectedUser}
      />
    </div>
  )
}

export default UserManagementPage
