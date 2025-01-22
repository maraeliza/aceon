import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material'
import { Delete, Edit, Add, Search } from '@mui/icons-material'
import { dataCompany, Empresa } from './data'

const TabelaEmpresas: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>(dataCompany)
  const [filteredEmpresas, setFilteredEmpresas] =
    useState<Empresa[]>(dataCompany)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpen = (empresa: Empresa | null = null): void => {
    setSelectedEmpresa(empresa)
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
    setSelectedEmpresa(null)
  }

  const saveChanges = (): void => {
    if (selectedEmpresa) {
      setEmpresas(
        empresas.map((empresa) =>
          empresa.id === selectedEmpresa.id ? selectedEmpresa : empresa,
        ),
      )
      handleClose()
    }
  }

  const deleteEmpresa = (id: number): void => {
    setEmpresas(empresas.filter((empresa) => empresa.id !== id))
  }

  // Função para filtrar as Empresas com base no termo de busca
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    const filtered = empresas.filter((empresa) =>
      empresa.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredEmpresas(filtered)
  }

  return (
    <div>
      {/* Campo de pesquisa */}
      <TextField
        label="Pesquisar Empresa"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        size="small"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        style={{ marginBottom: '20px' }}
      >
        Criar Empresa
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmpresas.map((empresa) => (
              <TableRow key={empresa.id}>
                <TableCell>{empresa.name}</TableCell>
                <TableCell>{empresa.phone}</TableCell>
                <TableCell>{empresa.cnpj}</TableCell>
                <TableCell>{empresa.address}</TableCell>

                <TableCell>
                  <IconButton onClick={() => handleOpen(empresa)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteEmpresa(empresa.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {selectedEmpresa
              ? `Editar Empresa: ${selectedEmpresa.name}`
              : 'Criar Nova Empresa'}
          </Typography>

          {/* Dados da Empresa */}
          <TextField
            label="Nome"
            value={selectedEmpresa?.name || ''}
            onChange={(e) => {
              if (selectedEmpresa) {
                setSelectedEmpresa({ ...selectedEmpresa, name: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Telefone"
            value={selectedEmpresa?.phone || ''}
            onChange={(e) => {
              if (selectedEmpresa) {
                setSelectedEmpresa({
                  ...selectedEmpresa,
                  phone: e.target.value,
                })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="CNPJ"
            value={selectedEmpresa?.cnpj || ''}
            onChange={(e) => {
              if (selectedEmpresa) {
                setSelectedEmpresa({ ...selectedEmpresa, cnpj: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Endereço"
            value={selectedEmpresa?.address || ''}
            onChange={(e) => {
              if (selectedEmpresa) {
                setSelectedEmpresa({
                  ...selectedEmpresa,
                  address: e.target.value,
                })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={saveChanges}>
              {selectedEmpresa ? 'Salvar' : 'Criar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default TabelaEmpresas
