import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { Delete, Edit, Search } from '@mui/icons-material'
import { Tenant } from '@/utils/interfaces'
import { ActionButtons } from '@/components/ActionButtons'
import {
  deleteTenant,
  getAllTenants,
  postTenant,
  updateTenant,
} from '@/hooks/tenant/useTenant'
import { getAllPlans } from '@/hooks/plan/usePlan'
import { getAllCountries } from '@/hooks/country/useCountries'

import ModalTenant from '../Components/Modal'
import AlertDelete from '@/components/Alerts/AlertDelete'

const Tabela: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)

  const [editTenant, setEditTenant] = useState<Tenant>({
    id: 0,
    planId: 0,
    countryId: 0,
    statusId: 1,
    signature: '',
    expiration: '',
    name: '',
    cellphone: null,
    CNPJ: '',
    address: null,
  })
  const [plans, setPlans] = useState<any[]>([])
  const [countries, setCountries] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const tenantsData = await getAllTenants()
      const plansData = await getAllPlans()
      const countriesData = await getAllCountries()

      setTenants(tenantsData)
      setPlans(plansData)
      setCountries(countriesData)
    }

    fetchData()
  }, [])

  const handleOpenAddModal = () => setOpenAddModal(true)
  const handleCloseAddModal = () => setOpenAddModal(false)

  const handleCloseEditModal = () => setOpenEditModal(false)
  const handleOpenEditModal = (tenant: Tenant) => {
    setEditTenant(tenant)
    setOpenEditModal(true)
  }

  const handleDelete = async (id: number): Promise<boolean> => {
    const success = await deleteTenant(id)
    if (success) {
      setTenants(tenants.filter((tenant) => tenant.id !== id))
    }
    return success
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    const filtered = tenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    setTenants(filtered)
  }

  const addNewTenant = async (newTenant: Tenant) => {
    const dataResponse = await postTenant(newTenant)
    if (dataResponse?.tenant) {
      setTenants([...tenants, { ...newTenant, id: dataResponse?.tenant?.id }])
    }
    setOpenAddModal(false)
  }

  const editExistingTenant = async (tenant: Tenant) => {
    const sucesss = await updateTenant(tenant)
    if (sucesss) {
      setTenants(tenants.map((t) => (t.id === tenant.id ? tenant : t)))
    }
    setOpenEditModal(false)
  }

  return (
    <div>
      <Typography variant="h4">Gerenciamento de Empresas</Typography>
      <TextField
        label="Pesquisar Empresa"
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
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Assinatura</TableCell>
              <TableCell>Vencimento</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>{tenant.id}</TableCell>
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.signature}</TableCell>
                <TableCell>{tenant.expiration}</TableCell>
                <TableCell>{tenant.CNPJ}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditModal(tenant)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      AlertDelete(handleDelete, tenant.id, tenant.name)
                    }
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

      <ModalTenant
        open={openAddModal}
        onClose={handleCloseAddModal}
        saveChanges={addNewTenant}
        plans={plans}
        countries={countries}
        isEditing={false}
      />
      <ModalTenant
        open={openEditModal}
        onClose={handleCloseEditModal}
        item={editTenant}
        saveChanges={editExistingTenant}
        plans={plans}
        countries={countries}
        isEditing={true}
      />
    </div>
  )
}

export default Tabela
