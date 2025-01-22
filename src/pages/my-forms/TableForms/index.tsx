import { useState } from 'react'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'

import { TabelaUsuarios } from './TableContainer'
import { TableToolBar } from './TableToolBar'

import { rows } from './data'

export default function TabelaForms() {
  const [selected, setSelected] = useState<readonly number[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolBar numSelected={selected.length} />
        <TabelaUsuarios
          page={page}
          rowsPerPage={rowsPerPage}
          rows={rows}
          selected={selected}
          setSelected={setSelected}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
