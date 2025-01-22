export type Order = 'asc' | 'desc'
export interface EnhancedTableProps {
  numSelected: number
  onRequestSort?: (
    event: React.MouseEvent<unknown>,
    property: keyof Data | keyof DataForm,
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}
export interface Data {
  id: number
  name: string
  level: string
  dtCreate: string
  dtLastUpdate: string
  status: string
}
export interface EnhancedTableToolbarProps {
  numSelected: number
}
export interface HeadCell {
  disablePadding: boolean
  id: keyof Data | keyof DataForm
  label: string
  numeric: boolean
}

export type UserStatus = 'Ativo' | 'Inativo'
export type FormStatus =
  | 'Ativo'
  | 'Inativo'
  | 'Expirado'
  | 'Cancelado'
  | 'Vencido'

export interface DataForm {
  id: number
  name: string
  status: FormStatus
  dtCreate: string
  dtLastUpdate: string
  lastUpdatedBy: string
  responses: number
  creator: string
}
export interface Group {
  id: number
  name: string
  createdBy: string
  lastModifiedBy: string
  createdAt: string
  lastModifiedAt: string
  users: string[]
  description: string
  permissions: string[]
}
export interface GroupTableProps {}

export interface User {
  id: number
  name: string
}

export interface Permission {
  name: string
  users: User[]
  groups: Group[]
}
