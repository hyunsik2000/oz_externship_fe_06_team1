import { TableRoot } from './TableRoot'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { TableRow } from './TableRow'
import { TableCell } from './TableCell'

export const Table = Object.assign(TableRoot, {
  // Table 호출 만으로 TableHeader, TableBody, TableRow, TableCell을 사용할 수 있도록 함
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
})
