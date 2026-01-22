import type { ReactNode } from 'react'
import { Table } from './index'
import { cn } from '@/lib/cn'

export interface Column<T> {
  key: string
  title: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  cell: (item: T) => ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function DataTable<T extends { exam_id: number }>({
  data,
  columns,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[1200px]">
        <Table.Header>
          {columns.map((col) => (
            <Table.Cell
              key={`header-${col.key}`}
              size={col.size}
              className={cn('text-grey-800', col.className)}
            >
              {col.title}
            </Table.Cell>
          ))}
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.exam_id}>
              {columns.map((col) => (
                <Table.Cell
                  key={`cell-${item.exam_id}-${col.key}`}
                  size={col.size}
                  className={col.className}
                >
                  {col.cell(item)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
