export function transformData(data: any) {
  const result = {}
  data.forEach((item) => {
    const permissions = []
    if (item.add) permissions.push('add')
    if (item.view) permissions.push('view')
    if (item.update) permissions.push('update')
    if (item.delete) permissions.push('delete')
    result[item.name] = permissions
  })
  return result
}
