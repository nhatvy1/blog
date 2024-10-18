import { updateUser } from '@/apiRequest/user'
import NextDrawer from '@/components/ui/NextDrawer'
import NextInput from '@/components/ui/NextInput'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getListUsers } from '@/redux/slices/user.slice'
import { RootState } from '@/redux/store'
import { IFormUpdateUser, IUser } from '@/types/user.type'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
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

const UpdateUser = ({ isOpen, onClose }: Props) => {
  const { selectedUser } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<IFormUpdateUser>({
    defaultValues: {
      email: '',
      fullName: '',
      status: ''
    }
  })

  if (selectedUser) {
    setValue('email', selectedUser.email)
    setValue('fullName', selectedUser.fullName)
    setValue('status', selectedUser.status)
  }
  const handleClose = () => {
    onClose()
    reset()
  }

  const onSubmit: SubmitHandler<IFormUpdateUser> = async (
    value: IFormUpdateUser
  ) => {
    try {
      if (selectedUser) {
        const res = await updateUser(selectedUser._id, value)
        dispatch(getListUsers(''))
        toast.success(res.message || 'Cập nhật thành công')
      } else {
        toast.error('Không tìm thấy người dùng')
      }
    } catch (e: any) {
      toast.error(e || 'Vui lòng thử lại sau')
    } finally {
      handleClose()
    }
  }

  return (
    <NextDrawer
      isOpen={isOpen}
      onClose={handleClose}
      title={'Cập nhật người dùng'}
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

export default UpdateUser
