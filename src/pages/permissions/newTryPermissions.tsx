import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Tooltip,
  IconButton,
  Autocomplete,
  TextField,
  Grid,
} from '@mui/material'
import { Visibility, Edit, Delete, Add, Search } from '@mui/icons-material'

// Tipagem para as permissões
type Permission = 'read' | 'update' | 'create' | 'delete'
import { PERMISSIONS } from '@/configs/permissions'
import { NAVIGATION_ICONS } from '@/configs/screens'

// Tipagem para a estrutura de permissões
interface ScreenPermissions {
  [key: string]: {
    read: boolean
    update: boolean
    create: boolean
    delete: boolean
  }
}

// Tipagem para Usuários e Grupos
interface UserGroup {
  id: string
  name: string
}

// Dados simulados de usuários e grupos
const users: UserGroup[] = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Oliveira' },
  { id: '3', name: 'Carlos Pereira' },
]

const groups: UserGroup[] = [
  { id: 'a', name: 'Administração' },
  { id: 'b', name: 'Gestores' },
  { id: 'c', name: 'Vendedores' },
]

const PermissionScreen: React.FC = () => {
  const [permissions, setPermissions] = useState<ScreenPermissions>(PERMISSIONS)
  const [selectedUserOrGroup, setSelectedUserOrGroup] =
    useState<UserGroup | null>(null)
  const [activeTab, setActiveTab] = useState(0) // 0 para Usuário, 1 para Grupo

  // Função para alternar as permissões
  const handleTogglePermission = (screen: string, permission: Permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [screen]: {
        ...prevPermissions[screen],
        [permission]: !prevPermissions[screen][permission],
      },
    }))
  }

  // Função para mudar a aba ativa (Usuário ou Grupo)
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue)
    setSelectedUserOrGroup(null) // Limpar a seleção ao mudar a aba
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        gap: 3,
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Permissões
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant={activeTab === 0 ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => handleTabChange(0)}
            >
              Grupos
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={activeTab === 1 ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => handleTabChange(1)}
            >
              Papéis
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Campo de pesquisa para selecionar Usuário ou Grupo */}
      <Autocomplete
        options={activeTab === 0 ? users : groups}
        getOptionLabel={(option) => option.name}
        value={selectedUserOrGroup}
        onChange={(_, newValue) => setSelectedUserOrGroup(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={activeTab === 0 ? 'Selecione Usuário' : 'Selecione Grupo'}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <IconButton position="start">
                  <Search />
                </IconButton>
              ),
            }}
          />
        )}
        sx={{ width: '100%', marginBottom: 3 }}
      />

      {selectedUserOrGroup && (
        <>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
            Permissões de {selectedUserOrGroup.name}
          </Typography>

          <Grid container spacing={3} sx={{ width: '100%' }}>
            {Object.keys(permissions).map((screen, index) => {
              // Buscar o ícone da tela
              const screenIcon = NAVIGATION_ICONS[index]?.icon

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={screen}>
                  <Paper
                    sx={{
                      padding: 3,
                      borderRadius: 3,
                      boxShadow: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      height: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: 10,
                        transform: 'scale(1.05)',
                      },
                      justifyContent: 'center',
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/* Exibe o ícone ao lado do título */}
                      {screenIcon && (
                        <Box sx={{ marginRight: 1 }}>{screenIcon}</Box>
                      )}
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                        gutterBottom
                      >
                        {NAVIGATION_ICONS[index]?.title}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent={'center'}
                    >
                      <Tooltip title="Permissão para visualizar" arrow>
                        <IconButton
                          onClick={() => handleTogglePermission(screen, 'read')}
                          color={
                            permissions[screen].read ? 'success' : 'default'
                          }
                        >
                          <Visibility
                            sx={{
                              color: permissions[screen].read
                                ? 'green'
                                : 'gray',
                            }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Permissão para editar" arrow>
                        <IconButton
                          onClick={() =>
                            handleTogglePermission(screen, 'update')
                          }
                          color={
                            permissions[screen].update ? 'warning' : 'default'
                          }
                        >
                          <Edit
                            sx={{
                              color: permissions[screen].update
                                ? 'orange'
                                : 'gray',
                            }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Permissão para criar" arrow>
                        <IconButton
                          onClick={() =>
                            handleTogglePermission(screen, 'create')
                          }
                          color={
                            permissions[screen].create ? 'primary' : 'default'
                          }
                        >
                          <Add
                            sx={{
                              color: permissions[screen].create
                                ? 'blue'
                                : 'gray',
                            }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Permissão para excluir" arrow>
                        <IconButton
                          onClick={() =>
                            handleTogglePermission(screen, 'delete')
                          }
                          color={
                            permissions[screen].delete ? 'error' : 'default'
                          }
                        >
                          <Delete
                            sx={{
                              color: permissions[screen].delete
                                ? 'red'
                                : 'gray',
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </>
      )}
      {selectedUserOrGroup?.name ? (
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 3,
            padding: '12px 24px',
            fontSize: '1rem',
            borderRadius: 3,
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
          }}
        >
          Salvar Alterações
        </Button>
      ) : (
        <></>
      )}
    </Box>
  )
}

export default PermissionScreen
