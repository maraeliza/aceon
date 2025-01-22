import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material'

interface SettingsModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [apiKey, setApiKey] = useState<string>('')
  const [spreadsheetId, setSpreadsheetId] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [dataRange, setDataRange] = useState<string>('')
  const [syncMode, setSyncMode] = useState<string>('unidirectional')
  const [dateFormat, setDateFormat] = useState<string>('')
  const integrationType: string = 'google'
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Configurações de Integração</DialogTitle>
      <DialogContent>
        {/* Escolher tipo de integração */}
        <Grid container spacing={2}>
          {/* Campos específicos para Google Sheets */}
          {integrationType === 'google' && (
            <>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="apiKey"
                  label="Chave de API"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="primary"
                />
              </Grid>
            </>
          )}

          {/* Campos para Notion */}
          {integrationType === 'notion' && (
            <>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="notionToken"
                  label="Token de Integração"
                  value={apiKey} // Usando a mesma chave como token, mas pode ser diferente
                  onChange={(e) => setApiKey(e.target.value)}
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="databaseId"
                  label="ID do Banco de Dados"
                  value={spreadsheetId} // Usando a mesma variável, mas pode ser ajustado
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="primary"
                />
              </Grid>
            </>
          )}

          {/* Campos para Zapier */}
          {integrationType === 'zapier' && (
            <>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="zapierWebhook"
                  label="Webhook URL"
                  value={apiKey} // Usando a chave como webhook, pode ser diferente
                  onChange={(e) => setApiKey(e.target.value)}
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="primary"
                />
              </Grid>
            </>
          )}

          {/* Campo de Nome de Usuário e Senha */}
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="username"
              label="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
              color="primary"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              variant="outlined"
              color="primary"
            />
          </Grid>

          {/* Campo de Intervalo de Dados */}
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="dataRange"
              label="Intervalo de Dados"
              value={dataRange}
              onChange={(e) => setDataRange(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
              color="primary"
            />
          </Grid>

          {/* Campo de Modo de Sincronização */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="syncModeLabel">Modo de Sincronização</InputLabel>
              <Select
                labelId="syncModeLabel"
                id="syncMode"
                value={syncMode}
                onChange={(e) => setSyncMode(e.target.value)}
                label="Modo de Sincronização"
              >
                <MenuItem value="unidirectional">Unidirecional</MenuItem>
                <MenuItem value="bidirectional">Bidirecional</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Campo de Formato de Data */}
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="dateFormat"
              label="Formato de Data"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
              helperText="Exemplo: DD/MM/YYYY"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={onSave} color="primary" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SettingsModal
