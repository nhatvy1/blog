import { Action, Modules } from '@/utils/constant'
import { AiOutlineSecurityScan } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { PiCarProfileThin, PiUsersThin, PiUserSwitchThin } from 'react-icons/pi'

export const LIST_NAV_ITEM = [
  {
    name: 'Quản lý người dùng',
    href: '/user-management',
    icon: PiUserSwitchThin,
    module: Modules.USER,
    permission: Action.READ
  },
  {
    name: 'Phân quyền',
    href: '/role-management',
    icon: AiOutlineSecurityScan,
    module: Modules.ROLE,
    permission: Action.READ
  },
  {
    name: 'Quản lý dự án',
    icon: PiUserSwitchThin,
    module: 'project',
    permission: 'read',
    subMenu: [
      {
        name: 'Task Management',
        href: '/reminato/user-management',
        icon: PiCarProfileThin
      },
      {
        name: 'Policy',
        href: '/reminato/api-key-management',
        icon: PiCarProfileThin
      }
    ]
  },
]
