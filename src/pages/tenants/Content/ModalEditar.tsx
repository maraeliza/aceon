import React from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material'
import InputMask from 'react-input-mask'
import { Tenant } from '@/utils/interfaces'

interface ModalEditarProps {
  open: boolean
  onClose: () => void
  editTenant: Tenant
  setEditTenant: React.Dispatch<React.SetStateAction<Tenant>>
  handleUpdate: () => void
  plans: any[]
  countries: any[]
}

const ModalEditar = ({
  open,
  onClose,
  editTenant,
  setEditTenant,
  handleUpdate,
  plans,
  countries,
}: ModalEditarProps) => {
  const handleInputChange = (e: any, field: keyof Tenant) => {
    setEditTenant({ ...editTenant, [field]: e.target.value })
  }

  const handleDateChange = (e: any, field: keyof Tenant) => {
    const date = e.target.value
    const formattedDate = new Date(date).toISOString().split('T')[0]
    setEditTenant({ ...editTenant, [field]: formattedDate })
  }

  return (
    <Modal open={open} onClose={onClose}>
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
          Editar Empresa
        </Typography>

        <TextField
          label="Nome"
          value={editTenant.name}
          onChange={(e) => handleInputChange(e, 'name')}
          fullWidth
          size="small"
          margin="normal"
        />

        <InputMask
          mask="(99) 99999-9999"
          value={editTenant.cellphone || ''}
          onChange={(e) => handleInputChange(e, 'cellphone')}
        >
          {(inputProps: any) => (
            <TextField
              {...inputProps}
              label="Número"
              fullWidth
              size="small"
              margin="normal"
            />
          )}
        </InputMask>

        <TextField
          label="Assinatura"
          type="date"
          value={editTenant.signature}
          onChange={(e) => handleDateChange(e, 'signature')}
          fullWidth
          size="small"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Vencimento"
          type="date"
          value={editTenant.expiration}
          onChange={(e) => handleDateChange(e, 'expiration')}
          fullWidth
          size="small"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <InputMask
          mask="99.999.999/9999-99"
          value={editTenant.CNPJ || ''}
          onChange={(e) => handleInputChange(e, 'CNPJ')}
        >
          {(inputProps: any) => (
            <TextField
              {...inputProps}
              label="CNPJ"
              fullWidth
              size="small"
              margin="normal"
            />
          )}
        </InputMask>

        <Autocomplete
          options={plans}
          getOptionLabel={(option) => option.name}
          value={plans.find((plan) => plan.id === editTenant.planId) || null}
          onChange={(_, value) =>
            setEditTenant({ ...editTenant, planId: value?.id || 0 })
          }
          renderInput={(params) => <TextField {...params} label="Plano" />}
          fullWidth
          size="small"
          style={{ marginBottom: 10 }}
        />

        <TextField
          label="Endereço"
          value={editTenant.address}
          onChange={(e) => handleInputChange(e, 'address')}
          fullWidth
          size="small"
          margin="normal"
        />

        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.name}
          value={
            countries.find(
              (country) => country.country_id === editTenant.countryId,
            ) || null
          }
          onChange={(_, value) =>
            setEditTenant({ ...editTenant, countryId: value?.country_id || 0 })
          }
          renderInput={(params) => <TextField {...params} label="País" />}
          fullWidth
          size="small"
          style={{ marginBottom: 20 }}
        />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Atualizar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalEditar
