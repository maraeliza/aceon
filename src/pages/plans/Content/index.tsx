import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material'
import { Delete, Edit, Search } from '@mui/icons-material'
import {
  postPlan,
  deletePlan,
  updatePlan,
  getAllPlans,
} from '@/hooks/plan/usePlan'
import { ActionButtons } from '@/components/ActionButtons'

interface Plan {
  id: number
  name: string
  description: string
  price: number
}

const initialPlans = await getAllPlans()
const Content: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(initialPlans)
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [newPlan, setNewPlan] = useState<Plan>({
    id: 0,
    name: '',
    description: '',
    price: 0,
  })
  const [editPlan, setEditPlan] = useState<Plan>({
    id: 0,
    name: '',
    description: '',
    price: 0,
  })
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpenAddModal = (): void => {
    setOpenAddModal(true)
  }

  const handleCloseAddModal = (): void => {
    setOpenAddModal(false)
    setNewPlan({ id: 0, name: '', description: '', price: 0 })
  }

  const handleOpenEditModal = (plan: Plan): void => {
    setEditPlan(plan)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = (): void => {
    setOpenEditModal(false)
    setEditPlan({ id: 0, name: '', description: '', price: 0 })
  }

  const handleInputChange = (e: any, field: keyof Plan): void => {
    setNewPlan({ ...newPlan, [field]: e.target.value })
  }

  const handleEditInputChange = (e: any, field: keyof Plan): void => {
    setEditPlan({ ...editPlan, [field]: e.target.value })
  }

  const savePlan = async () => {
    const planData = {
      id: 0,
      name: newPlan.name,
      description: newPlan.description,
      price: newPlan.price,
    }

    const response = await postPlan(planData)
    if (response?.plan) {
      setPlans([...plans, response.plan])
      setFilteredPlans([...plans, response.plan])
      handleCloseAddModal()
    }
  }

  const handleDelete = async (id: number) => {
    const success = await deletePlan(id) // Passa o ID correto
    if (success) {
      setPlans(plans.filter((plan) => plan.id !== id))
      setFilteredPlans(filteredPlans.filter((plan) => plan.id !== id))
    }
  }

  const handleUpdate = async () => {
    const updatedPlanData = {
      id: editPlan.id,
      name: editPlan.name,
      description: editPlan.description,
      price: editPlan.price,
    }
    const response = await updatePlan(editPlan.id, updatedPlanData)
    if (response) {
      console.log(response)
      const planoAtualizado = response.plan
      console.log('PLANO Atualizado', planoAtualizado)
      setPlans(
        plans.map((plan) => (plan.id === editPlan.id ? response.plan : plan)),
      )
      setFilteredPlans(
        filteredPlans.map((plan) =>
          plan.id === editPlan.id ? response.plan : plan,
        ),
      )
      handleCloseEditModal()
    }
  }

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value
    setSearchTerm(value)
    const filtered = plans.filter((plan) =>
      plan.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredPlans(filtered)
  }

  return (
    <div>
      <Typography variant="h4">Gerenciamento de Planos</Typography>
      <TextField
        label="Pesquisar Plano"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        size="small"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <ActionButtons handleOpenAddModal={handleOpenAddModal} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>R$ {Number(plan.price).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditModal(plan)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(plan.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openAddModal} onClose={handleCloseAddModal}>
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
            Adicionar Novo Plano
          </Typography>

          <TextField
            label="Nome"
            value={newPlan.name}
            onChange={(e) => handleInputChange(e, 'name')}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Descrição"
            value={newPlan.description}
            onChange={(e) => handleInputChange(e, 'description')}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Preço"
            type="number"
            value={newPlan.price}
            onChange={(e) => handleInputChange(e, 'price')}
            fullWidth
            size="small"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleCloseAddModal}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={savePlan}>
              Adicionar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal para Editar Plano */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
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
            Editar Plano
          </Typography>

          <TextField
            label="Nome"
            value={editPlan.name}
            onChange={(e) => handleEditInputChange(e, 'name')}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Descrição"
            value={editPlan.description}
            onChange={(e) => handleEditInputChange(e, 'description')}
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Preço"
            type="number"
            value={editPlan.price}
            onChange={(e) => handleEditInputChange(e, 'price')}
            fullWidth
            size="small"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleCloseEditModal}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Atualizar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Content
