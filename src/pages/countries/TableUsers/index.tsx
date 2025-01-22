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
import { Country, initialCountries } from './data'


const TabelaPaises: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>(initialCountries)
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(initialCountries)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpen = (country: Country | null = null): void => {
    setSelectedCountry(country)
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
    setSelectedCountry(null)
  }

  const saveChanges = (): void => {
    if (selectedCountry) {
      if (countries.some((c) => c.country_id === selectedCountry.country_id)) {
        setCountries(
          countries.map((c) =>
            c.country_id === selectedCountry.country_id ? selectedCountry : c,
          ),
        )
      } else {
        setCountries([
          ...countries,
          { ...selectedCountry, country_id: Date.now() },
        ])
      }
      handleClose()
    }
  }

  const deleteCountry = (id: number): void => {
    setCountries(countries.filter((country) => country.country_id !== id))
  }

  // Função para filtrar os países com base no termo de busca
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
      {/* Campo de pesquisa */}
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

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        style={{ marginBottom: '20px' }}
      >
        Adicionar País
      </Button>

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
                  <IconButton onClick={() => handleOpen(country)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteCountry(country.country_id)}
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
            {selectedCountry
              ? `Editar País: ${selectedCountry.name}`
              : 'Adicionar Novo País'}
          </Typography>

          {/* Formulário para editar/novo país */}
          <TextField
            label="Nome"
            value={selectedCountry?.name || ''}
            onChange={(e) =>
              setSelectedCountry((prev) =>
                prev ? { ...prev, name: e.target.value } : null,
              )
            }
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Código ISO"
            value={selectedCountry?.iso_code || ''}
            onChange={(e) =>
              setSelectedCountry((prev) =>
                prev ? { ...prev, iso_code: e.target.value } : null,
              )
            }
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="URL da Bandeira"
            value={selectedCountry?.flag_url || ''}
            onChange={(e) =>
              setSelectedCountry((prev) =>
                prev ? { ...prev, flag_url: e.target.value } : null,
              )
            }
            fullWidth
            size="small"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={saveChanges}>
              {selectedCountry ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default TabelaPaises
