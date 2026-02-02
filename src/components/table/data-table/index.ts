import { TableRoot } from '@/components/table/data-table/TableRoot'
import { TableHeader } from '@/components/table/data-table/TableHeader'
import { TableBody } from '@/components/table/data-table/TableBody'
import { TableRow } from '@/components/table/data-table/TableRow'
import { TableCell } from '@/components/table/data-table/TableCell'

export const Table = Object.assign(TableRoot, {
  // Table 호출 만으로 TableHeader, TableBody, TableRow, TableCell을 사용할 수 있도록 함
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
})
