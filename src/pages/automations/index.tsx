import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  Tooltip,
  CircularProgress,
  InputAdornment,
} from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import ErrorIcon from '@mui/icons-material/Error'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SearchIcon from '@mui/icons-material/Search'
interface Workflow {
  id: number
  name: string
  status: string // Ou outros valores possíveis
  lastRun: string // Pode ser uma string ou um tipo de data mais complexo se necessário
  trigger: string
  actions: string
}
const AutomationPage = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 1,
      name: 'Formulário de Contato',
      status: 'active',
      lastRun: 'Hoje às 10:00',
      trigger: 'Formulário enviado',
      actions: 'Enviar e-mail',
    },
    {
      id: 2,
      name: 'Integração com Google Sheets',
      status: 'inactive',
      lastRun: 'Ontem às 17:00',
      trigger: 'Novo registro',
      actions: 'Adicionar linha',
    },
    {
      id: 3,
      name: 'Envio de E-mail de Boas-Vindas',
      status: 'failed',
      lastRun: 'Falhou ontem às 14:00',
      trigger: 'Novo usuário',
      actions: 'Enviar e-mail',
    },
    {
      id: 4,
      name: 'Notificação de Produto Novo',
      status: 'inactive',
      lastRun: 'Ontem às 15:00',
      trigger: 'Novo produto adicionado',
      actions: 'Enviar notificação',
    },
    {
      id: 5,
      name: 'Backup de Dados',
      status: 'active',
      lastRun: 'Hoje às 08:00',
      trigger: 'Horário agendado',
      actions: 'Fazer backup',
    },
  ])
  const [filteredWorkflows, setFilteredWorkflows] = useState(workflows)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState<Workflow>({
    id: 0,
    name: '',
    trigger: '',
    actions: '',
    status: 'inactive',
    lastRun: '',
  })
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow>()
  const [isSaving, setIsSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleDialogOpen = () => setIsDialogOpen(true)
  const handleDialogClose = () => setIsDialogOpen(false)

  const handleWorkflowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewWorkflow((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveWorkflow = async () => {
    setIsSaving(true)
    if (editingWorkflow) {
      setWorkflows(
        workflows.map((workflow) =>
          workflow.id === editingWorkflow.id
            ? { ...workflow, ...newWorkflow }
            : workflow,
        ),
      )
    } else {
      setWorkflows([...workflows, { ...newWorkflow, id: workflows.length + 1 }])
    }
    setNewWorkflow({
      id: 0,
      name: '',
      trigger: '',
      actions: '',
      status: 'inactive',
      lastRun: '',
    })
    setIsDialogOpen(false)
    setIsSaving(false)
  }

  const handleEditWorkflow = (workflow: Workflow) => {
    setEditingWorkflow(workflow)
    setNewWorkflow(workflow)
    setIsDialogOpen(true)
  }

  const handleDeleteWorkflow = (id: number) => {
    setWorkflows(workflows.filter((workflow) => workflow.id !== id))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value === '') {
      setFilteredWorkflows(workflows)
    } else {
      setFilteredWorkflows(
        workflows.filter((workflow) =>
          workflow.name.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      )
    }
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Tooltip title="Ativo - A automação está em funcionamento">
            <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
          </Tooltip>
        )
      case 'inactive':
        return (
          <Tooltip title="Inativo - A automação está desativada">
            <HelpOutlineIcon color="disabled" sx={{ fontSize: 18 }} />
          </Tooltip>
        )
      case 'failed':
        return (
          <Tooltip title="Falha na execução - A automação falhou na última execução">
            <ErrorIcon color="error" sx={{ fontSize: 18 }} />
          </Tooltip>
        )
      default:
        return null
    }
  }

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'gray'
      case 'failed':
        return 'orange'
      default:
        return 'transparent'
    }
  }

  const handleTogglePausePlay = (id: number) => {
    setWorkflows(
      workflows.map((workflow) =>
        workflow.id === id
          ? {
              ...workflow,
              status: workflow.status === 'active' ? 'inactive' : 'active',
            }
          : workflow,
      ),
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Automação com n8n
      </Typography>

      {/* Caixa de pesquisa com sugestões */}
      <Autocomplete
        freeSolo
        options={workflows.map((workflow) => workflow.name)}
        value={searchQuery}
        onInputChange={(event, newInputValue): any =>
          handleSearchChange({ target: { value: newInputValue } } as any)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar Automação"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        sx={{ mb: 3 }}
      />

      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Fluxos de Trabalho</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen()}
            sx={{
              borderRadius: '8px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            Nova Automação
          </Button>
        </Box>

        {/* Lista de fluxos de trabalho */}
        <Grid container spacing={3}>
          {filteredWorkflows.length > 0 ? (
            filteredWorkflows.map((workflow) => (
              <Grid item xs={12} sm={6} md={4} key={workflow.id}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 320,
                    height: '100%', // Garantir altura igual para todos os cards
                    border: `2px solid ${getStatusBorderColor(workflow.status)}`, // Borda colorida de acordo com o status
                    position: 'relative', // Para o ícone de status ficar no canto superior direito
                    transition: 'all 0.3s ease-in-out', // Suavizar a transição de estilo
                  }}
                >
                  {/* Ícone de Status no canto superior direito */}
                  <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    {renderStatus(workflow.status)}
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {workflow.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Última execução: {workflow.lastRun}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="textSecondary">
                      Disparo: {workflow.trigger}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ações: {workflow.actions}
                    </Typography>
                  </Box>

                  {/* Botões de Ação */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 2,
                      mt: 'auto',
                    }}
                  >
                    <Tooltip title="Editar">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditWorkflow(workflow)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Deletar">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={
                        workflow.status === 'active' ? 'Pausar' : 'Reiniciar'
                      }
                    >
                      <IconButton
                        color="secondary"
                        onClick={() => handleTogglePausePlay(workflow.id)}
                      >
                        {workflow.status === 'active' ? (
                          <PauseCircleIcon />
                        ) : (
                          <PlayCircleIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              Nenhuma automação encontrada.
            </Typography>
          )}
        </Grid>
      </Paper>

      {/* Dialog para adicionar/editar automações */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {editingWorkflow ? 'Editar Automação' : 'Nova Automação'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            name="name"
            value={newWorkflow.name}
            onChange={handleWorkflowChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Disparo"
            variant="outlined"
            fullWidth
            name="trigger"
            value={newWorkflow.trigger}
            onChange={handleWorkflowChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Ações"
            variant="outlined"
            fullWidth
            name="actions"
            value={newWorkflow.actions}
            onChange={handleWorkflowChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleSaveWorkflow}
            color="primary"
            variant="contained"
            startIcon={
              isSaving ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SaveIcon />
              )
            }
            disabled={isSaving}
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AutomationPage
