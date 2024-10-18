import { fetchRoles } from '@/apiRequest/role'
import { DeleteIcon } from '@/components/icons/DeleteIcon'
import { EditIcon } from '@/components/icons/EditIcon'
import { IRole } from '@/types/role.type'
import { Button, Card, Skeleton, Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import UpdateRole from './components/UpdateRole'
import AuthorizationRole from './components/AuthorizationRole'
import RoleDetail from './components/RoleDetail'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getListRoles } from '@/redux/slices/team.slice'

export let defaultPermissionsClose = {
  user: { create: false, read: false, update: false, delete: false },
  role: { create: false, read: false, update: false, delete: false }
}

const RoleManageMentPage = () => {
  const {listRoles, loading } = useSelector((state: RootState)=> state.role)
  const dispatch = useAppDispatch()
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [currentRole, setCurrentRole] = useState<IRole | null>(null)

  const fetchRoles = async () => {
    dispatch(getListRoles())
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const toggleDetail = () => {
    if (isOpenDetail) {
      setCurrentRole(null)
    }
    setIsOpenDetail(!isOpenDetail)
  }

  const toggleUpdate = () => {
    if (isOpenUpdate) {
      setCurrentRole(null)
    }
    setIsOpenUpdate(!isOpenUpdate)
  }

  const handleOpen = (role: IRole) => {
    setIsOpenUpdate(true)
    setCurrentRole(role)
  }

  const handleOpenDetail = (role: IRole) => {
    setIsOpenDetail(true)
    setCurrentRole(role)
  }

  const handleOpenAdd = () => {
    setIsOpenUpdate(true)
  }

  return (
    <div className=''>
      <Button
        className='bg-primary text-white'
        radius='none'
        onPress={handleOpenAdd}
      >
        Thêm mới role
      </Button>
      <div className='flex flex-wrap gap-5 mt-4'>
        {loading ? (
          <>
            {Array.from({ length: 3 }, (_, index) => (
              <Card
                className='max-w-[300px] w-full space-y-5 p-4'
                radius='lg'
                key={index}
              >
                <Skeleton className='rounded-lg'>
                  <div className='h-24 rounded-lg bg-default-300'></div>
                </Skeleton>
              </Card>
            ))}
          </>
        ) : (
          <>
            {listRoles.map((item) => (
              <div
                className='block max-w-[300px] w-full p-6 bg-white border border-gray-200 rounded-lg shadow'
                key={item._id}
              >
                <div className='mb-2 text-2xl tracking-tight text-gray-900 dark:text-white'>
                  <h5 className='font-bold'>{item.name}</h5>
                  {(item.name === 'customer' || item.name === 'admin') && (
                    <p className='text-base font-medium'>Role mặc định</p>
                  )}
                </div>
                <div className='flex items-center gap-3'>
                  <Tooltip content='Xem chi tiết'>
                    <Button
                      color='default'
                      isIconOnly
                      className=''
                      radius='sm'
                      onPress={() => handleOpenDetail(item)}
                    >
                      <AiOutlineEye />
                    </Button>
                  </Tooltip>
                  <AuthorizationRole name={item.name}>
                    <Tooltip content='Cập nhật'>
                      <Button
                        color='primary'
                        isIconOnly
                        className=''
                        radius='sm'
                        onPress={() => handleOpen(item)}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                  </AuthorizationRole>
                  <AuthorizationRole name={item.name}>
                    <Tooltip content='Xóa'>
                      <Button
                        color='danger'
                        isIconOnly
                        className=''
                        radius='sm'
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </AuthorizationRole>
                </div>
              </div>
            ))}

            <UpdateRole
              isOpen={isOpenUpdate}
              onClose={toggleUpdate}
              role={currentRole}
            />

            <RoleDetail
              isOpen={isOpenDetail}
              onClose={toggleDetail}
              role={currentRole}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default RoleManageMentPage
