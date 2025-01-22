import React, { useState } from 'react';
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
} from '@mui/material';
import { Delete, Edit, Add, Search } from '@mui/icons-material';
import { Plan, initialPlans } from './data';

const TabelaPlanos: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(initialPlans);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleOpen = (plan: Plan | null = null): void => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setSelectedPlan(null);
  };

  const saveChanges = (): void => {
    if (selectedPlan) {
      if (plans.some((p) => p.plan_id === selectedPlan.plan_id)) {
        setPlans(plans.map((p) => (p.plan_id === selectedPlan.plan_id ? selectedPlan : p)));
      } else {
        setPlans([
          ...plans,
          { ...selectedPlan, plan_id: Date.now() }, // Gera um ID único para novos planos
        ]);
      }
      handleClose();
    }
  };

  const deletePlan = (id: number): void => {
    setPlans(plans.filter((plan) => plan.plan_id !== id));
  };

  // Função para filtrar os planos com base no termo de busca
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = plans.filter((plan) =>
      plan.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredPlans(filtered);
  };

  return (
    <div>
      {/* Campo de pesquisa */}
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

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        style={{ marginBottom: '20px' }}
      >
        Adicionar Plano
      </Button>

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
              <TableRow key={plan.plan_id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>R$ {plan.price.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(plan)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deletePlan(plan.plan_id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
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
            {selectedPlan
              ? `Editar Plano: ${selectedPlan.name}`
              : 'Adicionar Novo Plano'}
          </Typography>

          {/* Formulário para editar/criar plano */}
          <TextField
            label="Nome"
            value={selectedPlan?.name || ''}
            onChange={(e) =>
              setSelectedPlan((prev) =>
                prev ? { ...prev, name: e.target.value } : null,
              )
            }
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Descrição"
            value={selectedPlan?.description || ''}
            onChange={(e) =>
              setSelectedPlan((prev) =>
                prev ? { ...prev, description: e.target.value } : null,
              )
            }
            fullWidth
            size="small"
            margin="normal"
          />

          <TextField
            label="Preço"
            type="number"
            value={selectedPlan?.price || ''}
            onChange={(e) =>
              setSelectedPlan((prev) =>
                prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null,
              )
            }
            fullWidth
            size="small"
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={saveChanges}>
              {selectedPlan ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TabelaPlanos;
