'use client'
import React from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@mui/material'
import { format } from 'date-fns' // Para formatação de datas
import { formData } from './data'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
const TableForm: React.FC = () => {
  const selectedForms: string[] = []
  const selectedAction: string[] = []
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestão de Formulários
      </Typography>

      {/* Botão de Criar Formulário */}
      <Button variant="contained" color="primary" sx={{ marginBottom: 3 }}>
        Criar Formulário
      </Button>

      {/* Seletor de Ações em Massa */}
      <Box sx={{ marginBottom: 3 }}>
        <FormControl fullWidth sx={{ maxWidth: 200 }}>
          <InputLabel id="select-action-label">Ações em Massa</InputLabel>
          <Select
            labelId="select-action-label"
            value={selectedAction}
            label="Ações em Massa"
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              boxShadow: 1,
              '& .MuiSelect-icon': {
                color: 'primary.main', // Cor do ícone
              },
            }}
          >
            <MenuItem value="ativar">Ativar</MenuItem>
            <MenuItem value="desativar">Desativar</MenuItem>
            <MenuItem value="deletar">Deletar</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Seletor de Formulários */}
      <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel id="select-forms-label">
          Selecione os Formulários
        </InputLabel>
        <Select
          labelId="select-forms-label"
          multiple
          value={selectedForms}
          renderValue={(selected) => selected.join(', ')}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          {formData.map((form) => (
            <MenuItem key={form.id} value={form.name}>
              <Checkbox checked={selectedForms.indexOf(form.name) > -1} />
              <ListItemText primary={form.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Tabela de Formulários */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de formulários">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome do Formulário</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Última Atualização</strong>
              </TableCell>
              <TableCell>
                <strong>Respostas</strong>
              </TableCell>
              <TableCell>
                <strong>Criador</strong>
              </TableCell>
              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((form) => (
              <TableRow key={form.id}>
                <TableCell>{form.name}</TableCell>
                <TableCell>{form.status}</TableCell>
                <TableCell>
                  {format(form.lastUpdated, 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>{form.responses}</TableCell>
                <TableCell>{form.creator}</TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Link color="primary">Veja mais</Link>
                  <ArrowForwardIcon color="primary" sx={{ fontSize: 16 }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TableForm
