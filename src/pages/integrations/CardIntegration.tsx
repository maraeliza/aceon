import React, { JSX, useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Tooltip,
  IconButton,
  Box,
  Typography,
  Stack,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import SettingsModal from './SettingIntegration'

interface IntegrationCardProps {
  integration: {
    id: number
    name: string
    status: string
    description: string
    icon: JSX.Element
  }
  onConnect: (id: number) => void
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onConnect,
}) => {
  const [openSettingsModal, setOpenSettingsModal] = useState(false)

  const handleOpenSettings = () => {
    setOpenSettingsModal(true)
  }

  const handleCloseSettings = () => {
    setOpenSettingsModal(false)
  }

  const handleSaveSettings = () => {
    setOpenSettingsModal(false)
  }

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon color="success" />
      case 'inactive':
        return <HelpOutlineIcon color="disabled" />
      case 'failed':
        return <ErrorIcon color="error" />
      default:
        return null
    }
  }

  return (
    <Card
      sx={{
        border: `2px solid ${
          integration.status === 'active'
            ? 'green'
            : integration.status === 'failed'
              ? 'orange'
              : 'gray'
        }`,
        borderRadius: 2,
        boxShadow: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: '0.3s ease',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                display: 'inline-flex', // Alinha ícone e texto horizontalmente
                alignItems: 'center', // Alinha o ícone verticalmente com o texto
              }}
            >
              <Box
                sx={{
                  fontSize: 20,
                  marginRight: 1,
                  color:
                    integration.status === 'active'
                      ? 'green'
                      : integration.status === 'failed'
                        ? 'red'
                        : 'gray', // Altere as cores conforme o status
                }}
              >
                {integration.icon}
              </Box>
              {integration.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {integration.description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Tooltip title={integration.status}>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '50%',
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {renderStatusIcon(integration.status)}
          </Box>
        </Tooltip>
        <Tooltip title="Configurações">
          <IconButton
            color="primary"
            sx={{ ml: 1 }}
            onClick={handleOpenSettings}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Ações do Card */}
      <CardActions sx={{ justifyContent: 'space-between', pb: 2 }}>
        {integration.status === 'active' ? (
          <Tooltip title="Integração Ativa">
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled
              sx={{ textTransform: 'none' }}
            >
              Conectado
            </Button>
          </Tooltip>
        ) : integration.status === 'failed' ? (
          <Tooltip title="Falha na Conexão">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onConnect(integration.id)}
              sx={{ textTransform: 'none' }}
            >
              Tentar Novamente
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Conectar">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onConnect(integration.id)}
              sx={{ textTransform: 'none' }}
            >
              Conectar
            </Button>
          </Tooltip>
        )}
      </CardActions>

      {/* Modal de configurações */}
      <SettingsModal
        open={openSettingsModal}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
      />
    </Card>
  )
}

export default IntegrationCard
