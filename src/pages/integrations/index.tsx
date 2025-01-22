import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import GoogleIcon from '@mui/icons-material/Google'
import ZapierIcon from '@mui/icons-material/AccessAlarm'
import SalesforceIcon from '@mui/icons-material/Business'
import IntegrationCard from './CardIntegration'

const PageIntegrations = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'Google Sheets',
      status: 'active',
      description: 'Conecte seu Google Sheets para integrar com seu sistema.',
      icon: <GoogleIcon />,
    },
    {
      id: 2,
      name: 'Zapier',
      status: 'inactive',
      description: 'Automatize tarefas usando o Zapier.',
      icon: <ZapierIcon />,
    },
    {
      id: 3,
      name: 'Salesforce',
      status: 'failed',
      description: 'Integre com Salesforce para gerenciar clientes.',
      icon: <SalesforceIcon />,
    },
  ])
  const [searchValue, setSearchValue] = useState('')

  const handleConnectIntegration = (id: number) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, status: 'active' } // Marca como ativo após "conectar"
          : integration,
      ),
    )
  }

  // Filtra as integrações conforme o texto da pesquisa
  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Integrações
      </Typography>

      {/* Campo de pesquisa */}
      <Box sx={{ mb: 3 }}>
        <Autocomplete
          freeSolo
          options={integrations.map((option) => option.name)}
          onInputChange={(event, newInputValue) =>
            setSearchValue(newInputValue)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar Integração"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>

      {/* Grid de integrações */}
      <Grid container spacing={3}>
        {filteredIntegrations.map((integration) => (
          <Grid item xs={12} sm={6} md={4} key={integration.id}>
            <IntegrationCard
              integration={integration}
              onConnect={handleConnectIntegration}
            />
          </Grid>
        ))}
      </Grid>

      {/* Adicionar nova integração */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 2,
            paddingX: 4,
            paddingY: 2,
          }}
        >
          Adicionar Integração
        </Button>
      </Box>
    </Box>
  )
}

export default PageIntegrations
