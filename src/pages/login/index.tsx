'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Container,
  TextField,
  Grid,
  Button,
  Typography,
  Link,
} from '@mui/material'
import { isValidCNPJ, isValidCPF, isValidSenha } from '@/utils/validateInputs'
import routes from '@/configs/routes.json'
import { Router } from '@toolpad/core/AppProvider'

const LOGIN_ROUTE = routes.basePath + routes.loginUser

interface UserData {
  cpf: string
  cnpj: string
  senha: string
}

interface Props {
  router: Router
  setPathname: React.Dispatch<React.SetStateAction<string>>
}

const PageLogin = ({ router, setPathname }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserData>({
    mode: 'onChange',
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (data: UserData) => {
    try {
      setLoading(true)
      const response = await fetch(LOGIN_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.status === 200) {
        const result = await response.json()
        if (result.auth) {
          console.log('login feito com sucesso')
          setPathname('/dashboard') // Atualiza diretamente a rota
        } else {
          setErrorMessage('Credenciais inválidas')
        }
      } else {
        setErrorMessage(
          'Erro ao fazer login! Verifique suas credenciais e tente novamente.',
        )
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error)
      setErrorMessage(
        'Erro ao enviar dados para a API. Tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth="xs"
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
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          LOGIN
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CNPJ"
                variant="outlined"
                error={!!errors.cnpj}
                helperText={errors.cnpj ? errors.cnpj.message : ''}
                {...register('cnpj', {
                  required: 'CNPJ é obrigatório',
                  validate: (value) => isValidCNPJ(value) || 'CNPJ inválido',
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CPF"
                variant="outlined"
                error={!!errors.cpf}
                helperText={errors.cpf ? errors.cpf.message : ''}
                {...register('cpf', {
                  required: 'CPF é obrigatório',
                  validate: (value) => isValidCPF(value) || 'CPF inválido',
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                type="password"
                variant="outlined"
                error={!!errors.senha}
                helperText={errors.senha ? errors.senha.message : ''}
                {...register('senha', {
                  required: 'Senha é obrigatória',
                  validate: (value) => isValidSenha(value) || 'Senha inválida',
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ padding: '12px', fontSize: '16px' }}
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {errorMessage && (
          <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
          Não tem uma conta?{' '}
          <Link
            href="#/register"
            onClick={() => setPathname('/register')}
            color="primary"
          >
            Crie sua conta aqui
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default PageLogin
