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

interface Person {
  id: number
  name: string
  cpf: string
  phone: string
  cnpj: string
  address: string
}

const initialPeople: Person[] = [
  {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    phone: '1234567890',
    cnpj: '12.345.678/0001-00',
    address: 'Rua A, 123',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    cpf: '987.654.321-00',
    phone: '0987654321',
    cnpj: '23.456.789/0001-00',
    address: 'Avenida B, 456',
  },
  {
    id: 3,
    name: 'Pedro Santos',
    cpf: '111.222.333-44',
    phone: '1122334455',
    cnpj: '34.567.890/0001-00',
    address: 'Rua C, 789',
  },
  {
    id: 4,
    name: 'Ana Costa',
    cpf: '555.666.777-88',
    phone: '5566778899',
    cnpj: '45.678.901/0001-00',
    address: 'Avenida D, 123',
  },
]

const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>(initialPeople)
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(initialPeople)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpen = (person: Person | null = null): void => {
    setSelectedPerson(person)
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
    setSelectedPerson(null)
  }

  const saveChanges = (): void => {
    if (selectedPerson) {
      setPeople(
        people.map((person) =>
          person.id === selectedPerson.id ? selectedPerson : person,
        ),
      )
      handleClose()
    }
  }

  const deletePerson = (id: number): void => {
    setPeople(people.filter((person) => person.id !== id))
  }

  // Função para filtrar as pessoas com base no termo de busca
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    const filtered = people.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredPeople(filtered)
  }

  return (
    <div>
      {/* Campo de pesquisa */}
      <TextField
        label="Pesquisar Pessoa"
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
        Criar Pessoa
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPeople.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.cpf}</TableCell>
                <TableCell>{person.phone}</TableCell>
                <TableCell>{person.cnpj}</TableCell>
                <TableCell>{person.address}</TableCell>

                <TableCell>
                  <IconButton onClick={() => handleOpen(person)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => deletePerson(person.id)}
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
            {selectedPerson
              ? `Editar Pessoa: ${selectedPerson.name}`
              : 'Criar Nova Pessoa'}
          </Typography>

          {/* Dados da Pessoa */}
          <TextField
            label="Nome"
            value={selectedPerson?.name || ''}
            onChange={(e) => {
              if (selectedPerson) {
                setSelectedPerson({ ...selectedPerson, name: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="CPF"
            value={selectedPerson?.cpf || ''}
            onChange={(e) => {
              if (selectedPerson) {
                setSelectedPerson({ ...selectedPerson, cpf: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Telefone"
            value={selectedPerson?.phone || ''}
            onChange={(e) => {
              if (selectedPerson) {
                setSelectedPerson({ ...selectedPerson, phone: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="CNPJ"
            value={selectedPerson?.cnpj || ''}
            onChange={(e) => {
              if (selectedPerson) {
                setSelectedPerson({ ...selectedPerson, cnpj: e.target.value })
              }
            }}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Endereço"
            value={selectedPerson?.address || ''}
            onChange={(e) => {
              if (selectedPerson) {
                setSelectedPerson({
                  ...selectedPerson,
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
              {selectedPerson ? 'Salvar' : 'Criar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default PeopleList
