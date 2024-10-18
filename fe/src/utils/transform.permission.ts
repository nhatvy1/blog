export type Permission = {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}

export function parsePermission(input: Record<string, Permission>) {
  const actions = ['create', 'read', 'update', 'delete']

  return Object.keys(input).reduce((acc, key) => {
    const values = Object.values(input[key])

    // Check if all permissions are true for 'manage'
    if (values.every((val) => val === true)) {
      acc[key] = ['manage']
    } else {
      // Map true values to corresponding action names
      acc[key] = actions.filter((action, index) => values[index])
    }

    return acc
  }, {} as Record<string, string[]>)
}
