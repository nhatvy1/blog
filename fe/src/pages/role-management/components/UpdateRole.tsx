import { createRole } from '@/apiRequest/role'
import NextInput from '@/components/ui/NextInput'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getListRoles } from '@/redux/slices/team.slice'
import { IRole } from '@/types/role.type'
import { Permission, parsePermission } from '@/utils/transform.permission'
import {
  Button,
  getKeyValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  onClose: () => void
  role: IRole | null
}

export const ROLES: any = {
  role: 'Quản lý quyền hạn',
  user: 'Quản lý người dùng'
}

export let defaultPermissions = {
  user: { create: false, read: false, update: false, delete: false },
  role: { create: false, read: false, update: false, delete: false }
}

const UpdateRole = ({ isOpen, onClose, role }: Props) => {
  const dispatch = useAppDispatch()
  const [permissions, setPermissions] = useState<Record<string, Permission>>(
    JSON.parse(JSON.stringify(defaultPermissions))
  )
  const handleClose = () => {
    setPermissions(JSON.parse(JSON.stringify(defaultPermissions)))
    onClose()
  }

  const columns = [
    { name: 'Tên phần quyền', uid: 'name' },
    { name: 'Thêm', uid: 'create' },
    { name: 'Xem', uid: 'read' },
    { name: 'Sửa', uid: 'update' },
    { name: 'Xóa', uid: 'delete' },
    { name: 'Tất cả', uid: 'manage' }
  ]

  const rows = useMemo(
    () =>
      Object.keys(ROLES)?.map((key, index) => ({
        key: ++index,
        name: ROLES[key],
        read: (
          <Switch
            isSelected={permissions[key].read} // roles[key].read = read: false
            onChange={() =>
              setPermissions((prev: any) => ({
                ...prev,
                [key]: {
                  ...prev[key],
                  read: !prev[key].read
                }
              }))
            }
            color='success'
          />
        ),
        create: (
          <Switch
            isSelected={permissions[key].create}
            onChange={() =>
              setPermissions((prev: any) => ({
                ...prev,
                [key]: {
                  ...prev[key],
                  create: !prev[key].create
                }
              }))
            }
            color='success'
          />
        ),
        update: (
          <Switch
            isSelected={permissions[key].update}
            onChange={() =>
              setPermissions((prev: any) => ({
                ...prev,
                [key]: {
                  ...prev[key],
                  update: !prev[key].update
                }
              }))
            }
            color='success'
          />
        ),
        delete: (
          <Switch
            isSelected={permissions[key].delete}
            onChange={() =>
              setPermissions((prev: any) => ({
                ...prev,
                [key]: {
                  ...prev[key],
                  delete: !prev[key].delete
                }
              }))
            }
            color='success'
          />
        ),
        manage: (
          <Switch
            isSelected={
              permissions[key].create &&
              permissions[key].read &&
              permissions[key].update &&
              permissions[key].delete
            }
            onChange={() => {
              if (
                permissions[key].create &&
                permissions[key].read &&
                permissions[key].update &&
                permissions[key].delete
              ) {
                setPermissions((prev: any) => ({
                  ...prev,
                  [key]: {
                    create: false,
                    read: false,
                    update: false,
                    delete: false
                  }
                }))
              } else {
                setPermissions((prev: any) => ({
                  ...prev,
                  [key]: {
                    create: true,
                    read: true,
                    update: true,
                    delete: true
                  }
                }))
              }
            }}
            color='success'
          />
        )
      })),
    [role, permissions]
  )

  const transformPermissions = () => {
    if (role) {
      const rolePermissions = role.permissions
      let newRolePermission = JSON.parse(JSON.stringify(defaultPermissions))
      for (const subject of Object.keys(rolePermissions)) {
        if (subject === 'all') {
          Object.keys(newRolePermission).forEach((module) => {
            Object.keys(newRolePermission[module]).forEach((action) => {
              newRolePermission[module][action] = true
            })
          })
          break
        } else if (subject && newRolePermission[subject]) {
          if (rolePermissions[subject].includes('manage')) {
            Object.keys(newRolePermission).forEach((module) => {
              Object.keys(newRolePermission[module]).forEach((action) => {
                newRolePermission[subject][action] = true
              })
            })
          } else {
            rolePermissions[subject].forEach((action) => {
              if (newRolePermission[subject][action] !== undefined) {
                newRolePermission[subject][action] = true
              }
            })
          }
        }
      }

      setPermissions(newRolePermission)
    }
  }

  const { register, handleSubmit } = useForm<{ name: string }>()

  const onSubmit: SubmitHandler<{ name: string }> = async (value: {
    name: string
  }) => {
    try {
      const body = {
        name: value?.name,
        permissions: parsePermission(permissions)
      }
      if(role) {
        console.log('cap nhat')
      } else {
        const res = await createRole(body)
      }
      dispatch(getListRoles())
    } catch (e) {
      if (role) {
        toast.error('Cập nhật thât bại')
      }
      toast.success('Thêm mới thành công')
    } finally {
      if(role) {
        toast.success('Cập nhật thành công')
      } else {
        toast.success('Thêm mới thành công')
      }
      handleClose()
    }
  }

  useEffect(() => {
    if (role && isOpen) {
      transformPermissions()
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size='4xl'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {role ? `Cập nhật vai trò ${role.name}` : 'Thêm mới vai trò'}
            </ModalHeader>
            <ModalBody>
              <form id='addUpdateForm' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                  <NextInput
                    className=''
                    placeholder='Nhập tên vai trò người dùng'
                    label='Tên vai trò'
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Vui lòng nhập tên quyền hạn",
                      },
                    })}
                  />
                </div>
                <Table aria-label='Example table with dynamic content'>
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.uid} className='uppercase'>
                        {column.name}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={rows} emptyContent={'No rows to display.'}>
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' radius='sm' onPress={handleClose}>
                Đóng
              </Button>
              <Button
                color='primary'
                radius='sm'
                type='submit'
                form='addUpdateForm'
              >
                {role ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default UpdateRole
