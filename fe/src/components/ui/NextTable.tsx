import {
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { Key, memo, useMemo } from 'react'

interface Props<T> {
  columns: { name: string; id: string }[]
  data: T
  totalResults?: number
  totalPages?: number
  renderCell: (item: T, columnKey: Key) => string | JSX.Element | T
  isLoading?: boolean,
  onPageChange: (page: number)=> void,
  onLimitChange: (limit: number)=> void
}

const limit_pagination = [
  {
    label: '10',
    key: 10
  },
  {
    label: '20',
    key: 20
  },
  {
    label: '50',
    key: 50
  }
]

const NextTable = ({
  columns,
  data,
  totalResults = 0,
  totalPages = 1,
  renderCell,
  isLoading = false,
  onPageChange,
  onLimitChange
}: Props<any>) => {
  const handleChangePage = (page: number) => {
    onPageChange(page)
  }

  const handleLimit = (limit: number) => {
    onLimitChange(limit)
  }

  const pagination = useMemo(() => {
    return (
      <div className='flex items-center gap-4'>
        <Select
          aria-label='Limit pagination'
          placeholder='Select a limit'
          defaultSelectedKeys={['10']}
          className='max-w-[120px]'
          classNames={{
            mainWrapper: 'h-9 border !rounded-md p-0',
            trigger:
              'bg-transparent data-[hover=true]:bg-transparent rounded-none'
          }}
          onChange={(value) => handleLimit(+value.target.value)}
        >
          {limit_pagination.map((limit) => (
            <SelectItem key={limit.key}>{limit.label}</SelectItem>
          ))}
        </Select>
        <Pagination
          total={totalPages}
          page={1}
          classNames={{
            wrapper: 'flex gap-2'
          }}
          radius='sm'
          showControls
          onChange={handleChangePage}
        />
      </div>
    )
  }, [totalPages])

  return (
    <Table
      aria-label='Custom table nextui'
      classNames={{
        wrapper: 'p-0 shadow-none overflow-hidden',
        th: 'bg-white',
        tr: 'border-b h-10'
      }}
      radius='none'
      bottomContent={pagination}
    >
      <TableHeader>
        {columns.map((columns) => (
          <TableColumn key={columns.id}>{columns.name}</TableColumn>
        ))}
      </TableHeader>

      <TableBody
        emptyContent='Không có dữ liệu'
        items={data}
        loadingContent={<Spinner size='lg' />}
        isLoading={isLoading}
      >
        {(item: any) => (
          <TableRow key={item?._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default memo(NextTable)
