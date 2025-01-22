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
import { initialUsers } from './data'

interface User {
  id: number
  name: string
  cpf: string
  number: string
  cnpj: string
  address: string
}

const TabelaUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpen = (user: User | null = null): void => {
    setSelectedUser(user)
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
    setSelectedUser(null)
  }

  const saveChanges = (): void => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? selectedUser : user,
        ),
      )
      handleClose()
    }
  }

  const deleteUser = (id: number): void => {
    setUsers(users.filter((user) => user.id !== id))
  }

  // Função para filtrar os usuários com base no termo de busca
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  return (
    <div>
      {/* Campo de pesquisa */}
      <TextField
        label="Pesquisar Usuário"
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
        Criar Usuário
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.cpf}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>{user.cnpj}</TableCell>
                <TableCell>{user.address}</TableCell>

                <TableCell>
                  <IconButton onClick={() => handleOpen(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteUser(user.id)} color="error">
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
            {selectedUser
              ? `Editar Usuário: ${selectedUser.name}`
              : 'Criar Novo Usuário'}
          </Typography>

          {/* Dados do Usuário */}
          <TextField
            label="Nome"
            value={selectedUser?.name || ''}
            onChange={(e) => {
              if (selectedUser) {
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="CPF"
            value={selectedUser?.cpf || ''}
            onChange={(e) => {
              if (selectedUser) {
                setSelectedUser({ ...selectedUser, cpf: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Número"
            value={selectedUser?.number || ''}
            onChange={(e) => {
              if (selectedUser) {
                setSelectedUser({ ...selectedUser, number: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="CNPJ"
            value={selectedUser?.cnpj || ''}
            onChange={(e) => {
              if (selectedUser) {
                setSelectedUser({ ...selectedUser, cnpj: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Endereço"
            value={selectedUser?.address || ''}
            onChange={(e) => {
              if (selectedUser) {
                setSelectedUser({ ...selectedUser, address: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={saveChanges}>
              {selectedUser ? 'Salvar' : 'Criar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default TabelaUsers
