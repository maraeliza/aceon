import React from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Grid2 as Grid,
} from '@mui/material'
import { InputMask } from '@react-input/mask'
import { useForm, Controller } from 'react-hook-form'
import { Country, Plan, Tenant } from '@/utils/interfaces'
import { tenantSchema } from '@/utils/schemas' 
import { zodResolver } from '@hookform/resolvers/zod' 
import styles from '@/styles/inputs.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  item: Tenant
  setItem: React.Dispatch<React.SetStateAction<Tenant>>
  saveChanges: () => void
  plans: Plan[]
  countries: Country[]
  isEditing: boolean
}

const ModalTenant = ({
  open,
  onClose,
  item,
  setItem,
  saveChanges,
  plans,
  countries,
  isEditing,
}: ModalProps) => {
  const defaultValues = {
    id: isEditing ? item.id : 0,
    planId: isEditing ? item.planId : 1,
    countryId: 1,
    statusId: 1,
    signature: '',
    expiration: '',
    name: isEditing ? item.name : '',
    cellphone: '',
    CNPJ: '',
    address: '',
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tenantSchema),
    defaultValues,
  })

  const onSubmit = (data: Tenant) => {
    saveChanges()
    setItem(data)
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
          {isEditing ? `Editar ${item?.name}` : 'Nova Empresa'}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: 2 }}
          >
            <Grid container spacing={2}>
              <Grid size={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nome"
                      fullWidth
                      size="small"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid container size={12}>
                <Grid size={5}>
                  <Typography
                    variant="h6"
                    fontSize={14}
                    color={errors.cellphone ? 'darkred' : ''}
                  >
                    Celular:
                  </Typography>
                  <Controller
                    name="cellphone"
                    control={control}
                    render={({ field }) => (
                      <>
                        <InputMask
                          {...field}
                          className={
                            errors.cellphone ? styles.inputError : styles.input
                          }
                          mask="(__) _____-____"
                          replacement={{ _: /\d/ }}
                          placeholder="(XX) XXXXX-XXXX"
                          id="cellphone"
                          value={field.value as string}
                        />
                        {errors.cellphone && (
                          <Typography
                            variant="body2"
                            color="error"
                            fontSize={12}
                            marginTop={1}
                            paddingLeft={2}
                          >
                            {errors.cellphone.message}{' '}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid size={7}>
                  <Typography
                    variant="h6"
                    fontSize={14}
                    color={errors.CNPJ ? 'darkred' : ''}
                  >
                    CNPJ:
                  </Typography>
                  <Controller
                    name="CNPJ"
                    control={control}
                    render={({ field }) => (
                      <>
                        <InputMask
                          {...field}
                          className={
                            errors.CNPJ ? styles.inputError : styles.input
                          }
                          mask="__.___.___/____-__"
                          replacement={{ _: /\d/ }}
                          placeholder="CNPJ: XX.XXX.XXX/XXXX-XX"
                          id="cnpj"
                        />
                        {errors.CNPJ && (
                          <Typography
                            variant="body2"
                            color="error"
                            fontSize={12}
                            marginTop={1}
                            paddingLeft={2}
                          >
                            {errors.CNPJ.message}{' '}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
              <Grid size={6}>
                <Controller
                  name="signature"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Assinatura"
                      type="date"
                      fullWidth
                      size="small"
                      error={!!errors.signature}
                      helperText={
                        errors.signature ? errors.signature.message : ''
                      }
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="expiration"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Vencimento"
                      type="date"
                      fullWidth
                      size="small"
                      error={!!errors.expiration}
                      helperText={
                        errors.expiration ? errors.expiration.message : ''
                      }
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid>
              <Controller
                name="planId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={plans}
                    getOptionLabel={(option) => option.name}
                    value={
                      plans.find((plan) => plan.id === item.planId) || null
                    }
                    onChange={(_, value) =>
                      setItem({ ...item, planId: value?.id || 0 })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Plano"
                        fullWidth
                        size="small"
                        error={!!errors.planId}
                        helperText={errors.planId ? errors.planId.message : ''}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
              <Grid size={8} sx={{ marginTop: 2 }}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Endereço"
                      fullWidth
                      size="small"
                      error={!!errors.address}
                      helperText={errors.address ? errors.address.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid size={4} sx={{ marginTop: 2 }}>
                <Controller
                  name="countryId"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={countries}
                      getOptionLabel={(option) => option.name}
                      value={
                        countries.find(
                          (country) => country.country_id === item.countryId,
                        ) || null
                      }
                      onChange={(_, value) => {
                        field.onChange(value ? value.country_id : null)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="País"
                          fullWidth
                          size="small"
                          error={!!errors.countryId}
                          helperText={
                            errors.countryId ? errors.countryId.message : ''
                          }
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" color="primary" type="submit">
              {isEditing ? 'Salvar' : 'Criar'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default ModalTenant
