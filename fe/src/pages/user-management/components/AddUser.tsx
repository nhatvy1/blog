import { createUser } from '@/apiRequest/user'
import NextDrawer from '@/components/ui/NextDrawer'
import NextInput from '@/components/ui/NextInput'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getListUsers } from '@/redux/slices/user.slice'
import { IFormAddUser } from '@/types/user.type'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const animals = [
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Reject' },
  { key: 'pending', label: 'Pending' }
]

const AddEditUser = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IFormAddUser>({
    defaultValues: {
      email: '',
      fullName: '',
      status: ''
    }
  })

  const handleClose = () => {
    onClose()
    reset()
  }

  const onSubmit: SubmitHandler<IFormAddUser> = async (value: IFormAddUser) => {
    try {
      const res = await createUser(value)
      toast.success(res.message || 'Thêm người dùng thành công')
      dispatch(getListUsers(''))
    } catch (e: any) {
      toast.error(e?.message || 'Vui long thử lại sau')
    } finally {
      handleClose()
    }
  }

  return (
    <NextDrawer
      isOpen={isOpen}
      onClose={handleClose}
      title={'Thêm mới người dùng'}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 mt-2'
      >
        <NextInput
          {...register('fullName', {
            required: {
              value: true,
              message: 'Vui lòng nhập họ tên'
            },
            minLength: {
              value: 5,
              message: 'Minimum 5 characters required'
            },
            maxLength: {
              value: 100,
              message: 'Maximum 100 characters required'
            }
          })}
          label='Họ và tên'
          placeholder='Nhập họ tên'
          errorMessage={errors.fullName?.message}
          isInvalid={!!errors.fullName}
        />

        <NextInput
          {...register('email', {
            required: 'Vui lòng nhập email',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Email không đúng định dạng'
            }
          })}
          label='Email'
          placeholder='Nhập email'
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
        />

        <NextInput
          {...register('password', {
            required: {
              value: true,
              message: 'Vui lòng nhập mật khẩu'
            },
            minLength: {
              value: 1,
              message: 'Tối thiểu 1 ký tự'
            },
            maxLength: {
              value: 50,
              message: 'Tối đa 20 ký tự'
            }
          })}
          label='Mật khẩu'
          placeholder='Nhập mật khẩu'
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />
        <Select
          label='Chọn trạng thái'
          className='max-w-xs'
          labelPlacement='outside-left'
          classNames={{
            label: '!bg-transparent w-full block',
            trigger: '!bg-transparent shadow-none mt-1 border rounded-none',
            innerWrapper: '!mt-1',
            base: '!flex-wrap'
          }}
          {...register('status', {
            required: {
              value: true,
              message: 'Vui lòng chọn trạng thái'
            }
          })}
          errorMessage={errors.status?.message}
          isInvalid={!!errors.status}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>

        <Button
          className='text-white bg-primary !scale-100'
          radius='none'
          type='submit'
        >
          Thêm mới người dùng
        </Button>
      </form>
    </NextDrawer>
  )
}

export default AddEditUser
