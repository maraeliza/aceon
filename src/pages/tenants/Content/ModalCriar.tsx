import React, { forwardRef, InputHTMLAttributes } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Grid2 as Grid,
} from '@mui/material'
import { InputMask as InputMasked } from '@react-input/mask'
import { Tenant } from '@/utils/interfaces'
import styles from '@/styles/inputs.module.css'


interface ModalCriarProps {
  open: boolean
  onClose: () => void
  newTenant: Tenant
  setNewTenant: React.Dispatch<React.SetStateAction<Tenant>>
  saveTenant: () => void
  plans: any[]
  countries: any[]
}

const ModalCriar = ({
  open,
  onClose,
  newTenant,
  setNewTenant,
  saveTenant,
  plans,
  countries,
}: ModalCriarProps) => {
  
  const handleInputChange = (e: any, field: keyof Tenant) => {
    setNewTenant({ ...newTenant, [field]: e.target.value })
  }

  const handleDateChange = (e: any, field: keyof Tenant) => {
    const date = e.target.value
    const formattedDate = new Date(date).toISOString().split('T')[0]
    setNewTenant({ ...newTenant, [field]: formattedDate })
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
          Adicionar Nova Empresa
        </Typography>

        <Box
          sx={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: 2 }}
        >
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Nome"
                value={newTenant.name}
                onChange={(e) => handleInputChange(e, 'name')}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid container size={12}>
              <Grid size={5}>
                <Typography variant="h6" fontSize={14}>
                  Celular:
                </Typography>
                <InputMasked
                  className={styles.input}
                  mask="(__)_____-____"
                  replacement={{ _: /\d/ }}
                  placeholder="(XX) XXXXX-XXXX"
                  onChange={(e) => handleInputChange(e, 'cellphone')}
                  value={newTenant.cellphone as string}
                  id="cellphone"
                />
              </Grid>
              <Grid size={7}>
                <Typography variant="h6" fontSize={14}>
                  CNPJ:
                </Typography>
                <InputMasked
                  className={styles.input}
                  mask="__.___.___/____-__"
                  replacement={{ _: /\d/ }}
                  placeholder="CNPJ: XX.XXX.XXX/XXXX-XX"
                  onChange={(e) => handleInputChange(e, 'CNPJ')}
                  value={newTenant.CNPJ}
                  id="cnpj"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid size={6}>
              <TextField
                label="Assinatura"
                type="date"
                value={newTenant.signature}
                onChange={(e) => handleDateChange(e, 'signature')}
                fullWidth
                size="small"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid size={6}>
              <TextField
                label="Vencimento"
                type="date"
                value={newTenant.expiration}
                onChange={(e) => handleDateChange(e, 'expiration')}
                fullWidth
                size="small"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid>
            <Autocomplete
              options={plans}
              getOptionLabel={(option) => option.name}
              value={plans.find((plan) => plan.id === newTenant.planId) || null}
              onChange={(_, value) =>
                setNewTenant({ ...newTenant, planId: value?.id || 0 })
              }
              renderInput={(params) => (
                <TextField {...params} label="Plano" fullWidth size="small" />
              )}
            />
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid size={8} sx={{ marginTop: 2 }}>
              <TextField
                label="Endereço"
                value={newTenant.address}
                onChange={(e) => handleInputChange(e, 'address')}
                fullWidth
                size="small"
              />
            </Grid>

            {/* País */}
            <Grid size={4} sx={{ marginTop: 2 }}>
              <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.name}
                value={
                  countries.find(
                    (country) => country.country_id === newTenant.countryId,
                  ) || null
                }
                onChange={(_, value) =>
                  setNewTenant({
                    ...newTenant,
                    countryId: value?.country_id || 0,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="País" fullWidth size="small" />
                )}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Botões de ação */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={saveTenant}>
            Adicionar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalCriar
