'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Container,
  TextField,
  Grid,
  Button,
  Typography,
  FormHelperText,
  Link,
} from '@mui/material'
import { isValidCNPJ, isValidCPF, isValidSenha, isValidEmail } from '@/utils/validateInputs'
import routes from '@/configs/routes.json'
import { Router } from '@toolpad/core/AppProvider'

const REGISTER_ROUTE = routes.basePath + routes.registerUser

interface UserData {
  email: string
  cpf: string
  cnpj: string
  senha: string
  nome: string
}

interface Props {
  router: Router
  setPathname: React.Dispatch<React.SetStateAction<string>>
}

const PageRegister = ({ router, setPathname }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: UserData) => {
    try {
      const response = await fetch(REGISTER_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.status === 201) {
        setPathname('/dashboard')
      } else {
        console.log('Erro ao registrar usuário!')
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error)
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          Registro de Usuário
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                variant="outlined"
                {...register('nome', {
                  required: 'Nome é obrigatório',
                })}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                {...register('email', {
                  required: 'Email é obrigatório',
                  validate: (value: string) => isValidEmail(value) || 'Email inválido',
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CNPJ"
                variant="outlined"
                type="text"
                {...register('cnpj', {
                  required: 'CNPJ é obrigatório',
                  validate: (value: string) => isValidCNPJ(value) || 'CNPJ inválido',
                })}
                error={!!errors.cnpj}
                helperText={errors.cnpj?.message}
                onChange={(e) => {
                  setValue('cnpj', e.target.value.replace(/[^\d]/g, ''))
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CPF"
                variant="outlined"
                type="text"
                {...register('cpf', {
                  required: 'CPF é obrigatório',
                  validate: (value: string) => isValidCPF(value) || 'CPF inválido',
                })}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                onChange={(e) => {
                  setValue('cpf', e.target.value.replace(/[^\d]/g, ''))
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                type="password"
                {...register('senha', {
                  required: 'Senha é obrigatória',
                  validate: (value: string) => isValidSenha(value) || 'Senha inválida',
                })}
                error={!!errors.senha}
                helperText={errors.senha?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ padding: 1.5 }}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>

          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Já tem uma conta?{' '}
            <Link
              href="#/login"
              onClick={() => setPathname('/login')}
              color="primary"
            >
              Faça login aqui
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  )
}

export default PageRegister
