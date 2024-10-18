import NextInput from '@/components/ui/NextInput'
import { IRole } from '@/types/role.type'
import { Permission } from '@/utils/transform.permission'
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
import { defaultPermissions, ROLES } from './UpdateRole'
import { GoShieldCheck, GoShieldX } from 'react-icons/go'

interface Props {
  isOpen: boolean
  onClose: () => void
  role: IRole | null
}

const RoleDetail = ({ isOpen, onClose, role }: Props) => {
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
        create: permissions[key].create ? (
          <GoShieldCheck size={20} color='green' />
        ) : (
          <GoShieldX size={20} color='red' />
        ),
        read: permissions[key].read ? (
          <GoShieldCheck size={20} color='green' />
        ) : (
          <GoShieldX size={20} color='red' />
        ),
        update: permissions[key].update ? (
          <GoShieldCheck size={20} color='green' />
        ) : (
          <GoShieldX size={20} color='red' />
        ),
        delete: permissions[key].delete ? (
          <GoShieldCheck size={20} color='green' />
        ) : (
          <GoShieldX size={20} color='red' />
        ),
        manage:
          permissions[key].read &&
          permissions[key].create &&
          permissions[key].delete &&
          permissions[key].update ? (
            <GoShieldCheck size={20} color='green' />
          ) : (
            <GoShieldX size={20} color='red' />
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
              {role ? `Chi tiết nhật vai trò ${role.name}` : ''}
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <Button color='danger' radius='sm' onPress={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default RoleDetail
