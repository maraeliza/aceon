import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import { EnhancedTableHead } from './TableHeader'
import { DataForm, Order } from '@/utils/interfaces'
import { Box, Link, Typography } from '@mui/material'
import Text from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export const TabelaUsuarios = ({
  page,
  rowsPerPage,
  rows,
  selected,
  setSelected,
}: any) => {
  // Avoid a layout jump when reaching the last page with empty rows.
  const order: Order = 'asc'
  const orderBy: keyof DataForm = 'dtCreate'
  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  )
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: DataForm) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  return (
    <TableContainer>
      <Table
        aria-labelledby="tableTitle"
        size="medium"
        sx={{
          minWidth: 750,
          '& th, & td': {
            textAlign: 'left',
            verticalAlign: 'middle',
            padding: '8px',
          },
        }}
      >
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          rowCount={rows.length}
        />
        <TableBody>
          {visibleRows.map((row, index) => {
            const isItemSelected = selected.includes(row.id)
            const labelId = `enhanced-table-checkbox-${index}`

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding="checkbox" sx={{ textAlign: 'center' }}>
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </TableCell>

                <TableCell sx={{ height: '60px' }}>
                  <Text> {row.id}</Text>
                </TableCell>
                <TableCell sx={{ height: '60px' }}>
                  <Text sx={{ paddingLeft: 3 }}> {row.name}</Text>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: 0.5,
                      paddingLeft: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor:
                          row.status === 'Ativo'
                            ? 'green'
                            : row.status === 'Inativo'
                              ? 'red'
                              : 'gray',
                        marginRight: 1,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {row.status}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ height: '60px' }}>
                  <Text sx={{ paddingLeft: 3 }}>{row.responses}</Text>
                </TableCell>
                <TableCell sx={{ height: '60px' }}>
                  <Text sx={{ paddingLeft: 3 }}> {row.dtCreate} </Text>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', paddingLeft: 3 }}
                  >
                    {row.creator}
                  </Typography>
                </TableCell>
                <TableCell sx={{ height: '60px' }}>
                  <Text sx={{ paddingLeft: 3 }}>{row.dtLastUpdate}</Text>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <Text sx={{ paddingLeft: 3 }}>{row.lastUpdatedBy}</Text>
                  </Typography>
                </TableCell>

                <TableCell
                  sx={{
                    height: '65px',
                    paddingTop: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    paddingBottom: 15,
                  }}
                >
                  <Link color="primary">Veja mais</Link>
                  <ArrowForwardIcon color="primary" sx={{ fontSize: 16 }} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
