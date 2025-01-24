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
import {
  Country,
  deleteCountry,
  getAllCountries,
  postCountry,
  updateCountry,
} from './useCountries'
import { ActionButtons } from '../ActionButtons'

const initialCountries: Country[] = await getAllCountries()

const TabelaPaises: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>(initialCountries)
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(initialCountries)
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [newCountry, setNewCountry] = useState<Country>({
    country_id: 0,
    iso_code: '',
    name: '',
    flag_url: 'https://flagcdn.com/w320/fr.png',
  })
  const [editCountry, setEditCountry] = useState<Country>({
    country_id: 0,
    iso_code: '',
    name: '',
    flag_url: '',
  })
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpenAddModal = (): void => {
    setOpenAddModal(true)
  }

  const handleCloseAddModal = (): void => {
    setOpenAddModal(false)
    setNewCountry({
      country_id: 0,
      iso_code: '',
      name: '',
      flag_url: '',
    })
  }

  const handleOpenEditModal = (country: Country): void => {
    setEditCountry(country)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = (): void => {
    setOpenEditModal(false)
    setEditCountry({
      country_id: 0,
      iso_code: '',
      name: '',
      flag_url: '',
    })
  }

  const handleInputChange = (e: any, field: keyof Country): void => {
    setNewCountry({
      ...newCountry,
      [field]: e.target.value,
    })
  }

  const handleEditInputChange = (e: any, field: keyof Country): void => {
    setEditCountry({
      ...editCountry,
      [field]: e.target.value,
    })
  }

  const saveCountry = async (): Promise<void> => {
    try {
      const data = await postCountry(newCountry)
      const pais = data.country
      const addCountry = {
        country_id: pais.id,
        iso_code: pais.iso_code,
        name: pais.name,
        flag_url: pais.logo_url,
      }
      if (addCountry) {
        setCountries([...countries, addCountry])
        setFilteredCountries([...countries, addCountry])
        handleCloseAddModal()
      }
    } catch (error) {
      console.error('Erro ao adicionar país:', error)
    }
  }

  const updateCountryData = async (): Promise<void> => {
    try {
      const data = await updateCountry(editCountry.country_id, editCountry)
      if (data) {
        setCountries(
          countries.map((country) =>
            country.country_id === editCountry.country_id
              ? editCountry
              : country,
          ),
        )
        setFilteredCountries(
          filteredCountries.map((country) =>
            country.country_id === editCountry.country_id
              ? editCountry
              : country,
          ),
        )
        handleCloseEditModal()
      }
    } catch (error) {
      console.error('Erro ao atualizar país:', error)
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    console.log('ID DO PAIS' + id)
    const success = await deleteCountry(id)
    if (success) {
      setCountries(countries.filter((country) => country.country_id !== id))
      setFilteredCountries(
        filteredCountries.filter((country) => country.country_id !== id),
      )
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredCountries(filtered)
  }

  return (
    <div>
      <Typography variant="h4">Gerenciamento de Países</Typography>
      <TextField
        label="Pesquisar País"
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

      <ActionButtons handleOpenAddModal={handleOpenAddModal} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bandeira</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Código ISO</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries.map((country) => (
              <TableRow key={country.country_id}>
                <TableCell>
                  <img
                    src={country.flag_url}
                    alt={`Bandeira de ${country.name}`}
                    style={{ width: '50px', height: 'auto' }}
                  />
                </TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.iso_code}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditModal(country)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(country.country_id)}
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

      {/* Modal para adicionar novo país */}
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
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
            Adicionar Novo País
          </Typography>

          <TextField
            label="Nome"
            value={newCountry.name}
            onChange={(e) => handleInputChange(e, 'name')}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Código ISO"
            value={newCountry.iso_code}
            onChange={(e) => handleInputChange(e, 'iso_code')}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="URL da Bandeira"
            value={newCountry.flag_url}
            onChange={(e) => handleInputChange(e, 'flag_url')}
            fullWidth
            size="small"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleCloseAddModal}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={saveCountry}>
              Adicionar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openEditModal} onClose={handleCloseEditModal}>
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
            Editar País
          </Typography>

          <TextField
            label="Nome"
            value={editCountry.name}
            onChange={(e) => handleEditInputChange(e, 'name')}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Código ISO"
            value={editCountry.iso_code}
            onChange={(e) => handleEditInputChange(e, 'iso_code')}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="URL da Bandeira"
            value={editCountry.flag_url}
            onChange={(e) => handleEditInputChange(e, 'flag_url')}
            fullWidth
            size="small"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleCloseEditModal}>Cancelar</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={updateCountryData}
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default TabelaPaises
