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
import { getAllTenants, postTenant } from '@/hooks/tenant/useTenant'
import { getAllPlans } from '@/hooks/plan/usePlan'
import { getAllCountries } from '@/hooks/country/useCountries'

import ModalCriar from './ModalCriar'
import ModalEditar from './ModalEditar'

const Tabela: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [newTenant, setNewTenant] = useState<Tenant>({
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

  const handleOpenEditModal = (tenant: Tenant) => {
    setEditTenant(tenant)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => setOpenEditModal(false)

  const handleDelete = (id: number) => {
    setTenants(tenants.filter((tenant) => tenant.id !== id))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    const filtered = tenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    setTenants(filtered)
  }

  const addNewTenant = (newTenant: Tenant) => {
    postTenant(newTenant)
    setTenants([...tenants, newTenant])
    setOpenAddModal(false)
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
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.signature}</TableCell>
                <TableCell>{tenant.expiration}</TableCell>
                <TableCell>{tenant.CNPJ}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditModal(tenant)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(tenant.id)}
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

      <ModalCriar
        open={openAddModal}
        onClose={handleCloseAddModal}
        newTenant={newTenant}
        setNewTenant={setNewTenant}
        saveTenant={() => addNewTenant(newTenant)}
        plans={plans}
        countries={countries}
      />

      <ModalEditar
        open={openEditModal}
        onClose={handleCloseEditModal}
        editTenant={editTenant}
        setEditTenant={setEditTenant}
        handleUpdate={() => {}}
        plans={plans}
        countries={countries}
      />
    </div>
  )
}

export default Tabela
