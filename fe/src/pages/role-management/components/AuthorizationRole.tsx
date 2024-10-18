import { ReactNode } from 'react'

const AuthorizationRole = ({
  name,
  children
}: {
  name: string
  children: ReactNode
}) => {
  if (name === 'admin' || name === 'customer') {
    return null
  }

  return children
}

export default AuthorizationRole
