import React, { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack,
} from '@mui/material'

// Tipagem para o estado de informações da empresa
interface SocialMedia {
  facebook: string
  instagram: string
  linkedin: string
}

interface CompanyInfo {
  name: string
  logo: string
  cnpj: string
  address: string
  phone: string
  email: string
  socialMedia: SocialMedia
}

// Tipagem para as configurações de formulário
interface FormSettings {
  emailNotification: boolean
  emailRecipient: string
  loginRequired: boolean
  maxResponses: number
  multiPageForm: boolean
}

// Tipagem para as configurações do n8n
interface N8nSettings {
  apiKey: string
  triggerOnSubmission: boolean
  actionExample: string
}

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0)

  // Estados com tipagem
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    logo: '',
    cnpj: '',
    address: '',
    phone: '',
    email: '',
    socialMedia: { facebook: '', instagram: '', linkedin: '' },
  })

  const [formSettings, setFormSettings] = useState<FormSettings>({
    emailNotification: false,
    emailRecipient: '',
    loginRequired: false,
    maxResponses: 0,
    multiPageForm: false,
  })

  const [n8nSettings, setN8nSettings] = useState<N8nSettings>({
    apiKey: '',
    triggerOnSubmission: false,
    actionExample: '',
  })

  // Funções para manipulação de estados
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }

  const handleFormSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    setFormSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleN8nSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    setN8nSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', p: 2 }}>
      {/* Abas de Navegação */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="Formulários" />
        <Tab label="Automação" />
        <Tab label="Integrações" />
        <Tab label="Informações da Empresa" />
      </Tabs>

      {/* Conteúdo das Abas */}
      <Box sx={{ mb: 4 }}>
        {/* Formulários */}
        {selectedTab === 0 && (
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Configurações de Formulários
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formSettings.emailNotification}
                  onChange={handleFormSettingsChange}
                  name="emailNotification"
                />
              }
              label="Receber Notificação por E-mail"
              sx={{ mb: 2 }}
            />
            {formSettings.emailNotification && (
              <TextField
                label="E-mail para Notificação"
                variant="outlined"
                fullWidth
                value={formSettings.emailRecipient}
                name="emailRecipient"
                onChange={handleFormSettingsChange}
                sx={{ mb: 3 }}
              />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={formSettings.loginRequired}
                  onChange={handleFormSettingsChange}
                  name="loginRequired"
                />
              }
              label="Exigir Login para Preencher"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Limitar número de respostas por usuário"
              variant="outlined"
              fullWidth
              type="number"
              value={formSettings.maxResponses}
              name="maxResponses"
              onChange={handleFormSettingsChange}
              sx={{ mb: 3 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formSettings.multiPageForm}
                  onChange={handleFormSettingsChange}
                  name="multiPageForm"
                />
              }
              label="Modo de várias etapas"
              sx={{ mb: 2 }}
            />

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ padding: '10px 20px' }}
              >
                Salvar Configurações de Formulário
              </Button>
            </Stack>
          </Paper>
        )}

        {/* Automação (n8n) */}
        {selectedTab === 1 && (
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Configurações de Automação (n8n)
            </Typography>

            <TextField
              label="Chave de API do n8n"
              variant="outlined"
              fullWidth
              value={n8nSettings.apiKey}
              name="apiKey"
              onChange={handleN8nSettingsChange}
              sx={{ mb: 3 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={n8nSettings.triggerOnSubmission}
                  onChange={handleN8nSettingsChange}
                  name="triggerOnSubmission"
                />
              }
              label="Acionar automações após envio do formulário"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Ação Exemplo no n8n"
              variant="outlined"
              fullWidth
              value={n8nSettings.actionExample}
              name="actionExample"
              onChange={handleN8nSettingsChange}
              sx={{ mb: 3 }}
            />

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ padding: '10px 20px' }}
              >
                Salvar Configurações de Automação
              </Button>
            </Stack>
          </Paper>
        )}

        {/* Informações da Empresa */}
        {selectedTab === 3 && (
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Informações da Empresa
            </Typography>

            <TextField
              label="Nome da Empresa"
              variant="outlined"
              fullWidth
              value={companyInfo.name}
              name="name"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Logo da Empresa (URL)"
              variant="outlined"
              fullWidth
              value={companyInfo.logo}
              name="logo"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="CNPJ"
              variant="outlined"
              fullWidth
              value={companyInfo.cnpj}
              name="cnpj"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Endereço"
              variant="outlined"
              fullWidth
              value={companyInfo.address}
              name="address"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Telefone"
              variant="outlined"
              fullWidth
              value={companyInfo.phone}
              name="phone"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              value={companyInfo.email}
              name="email"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Facebook"
              variant="outlined"
              fullWidth
              value={companyInfo.socialMedia.facebook}
              name="facebook"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Instagram"
              variant="outlined"
              fullWidth
              value={companyInfo.socialMedia.instagram}
              name="instagram"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="LinkedIn"
              variant="outlined"
              fullWidth
              value={companyInfo.socialMedia.linkedin}
              name="linkedin"
              onChange={handleCompanyInfoChange}
              sx={{ mb: 3 }}
            />

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ padding: '10px 20px' }}
              >
                Salvar Informações da Empresa
              </Button>
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  )
}

export default SettingsPage
