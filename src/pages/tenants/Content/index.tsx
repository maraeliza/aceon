import React, { useState, useEffect, ChangeEventHandler } from 'react'
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
  Checkbox,
  Pagination,
  TablePagination,
  PaginationItem,
} from '@mui/material'

import { Delete, Edit, Search } from '@mui/icons-material'
import { Tenant } from '@/utils/interfaces'
import { ActionButtons } from '@/components/ActionButtons'
import {
  deleteTenant,
  deleteTenants,
  downloadTenantsExcel,
  downloadTenantsPDF,
  getAllTenants,
  getAlltenantsPaged,
  postTenant,
  updateTenant,
} from '@/hooks/tenant/useTenant'
import { getAllPlans } from '@/hooks/plan/usePlan'
import { getAllCountries } from '@/hooks/country/useCountries'

import ModalTenant from '../Components/Modal'
import AlertDelete from '@/components/Alerts/AlertDelete'

const Tabela: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [allTenants, setAllTenants] = useState<Tenant[]>([])
  const [selectedTenants, setSelectedTenants] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [perPage, setPerPage] = useState<number>(3)
  const [totalPages, setTotalPages] = useState<number>(1)

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
      const tenantsPagedData = await getAlltenantsPaged(page, perPage)
      setTenants(tenantsPagedData.tenants)
      setTotalPages(tenantsPagedData.pagination.totalPages)
    }

    fetchData()
  }, [page, perPage])

  useEffect(() => {
    const fetchData = async () => {
      const tenantsData = await getAllTenants()
      const plansData = await getAllPlans()
      const countriesData = await getAllCountries()
      setAllTenants(tenantsData)
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
      setSelectedTenants(new Set())
    }
    return success
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    const filtered = allTenants?.filter((tenant) =>
      tenant.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    setTenants(filtered)
  }

  const handleSelectTenant = (id: number) => {
    const newSelectedTenants = new Set(selectedTenants)
    if (newSelectedTenants.has(id)) {
      newSelectedTenants.delete(id)
    } else {
      newSelectedTenants.add(id)
    }
    setSelectedTenants(newSelectedTenants)
  }

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedTenants(new Set(tenants.map((tenant) => tenant.id)))
    } else {
      setSelectedTenants(new Set())
    }
  }

  const handleDeleteSelected = async () => {
    const selectedIds = Array.from(selectedTenants)
    const success = await deleteTenants(selectedIds)
    if (success) {
      setTenants((prevTenants) =>
        prevTenants.filter((tenant) => !selectedIds.includes(tenant.id)),
      )
      setSelectedTenants(new Set())
    }
  }

  const handleExportPDF = async () => {
    downloadTenantsPDF()
  }
  const handleExportExcel = async () => {
    downloadTenantsExcel()
  }
  const handleOpenFilter = async () => {}

  const addNewTenant = async (newTenant: Tenant) => {
    const dataResponse = await postTenant(newTenant)
    if (dataResponse?.tenant) {
      setTenants([...tenants, { ...newTenant, id: dataResponse?.tenant?.id }])
    }
    setOpenAddModal(false)
  }

  const editExistingTenant = async (tenant: Tenant) => {
    const success = await updateTenant(tenant)
    if (success) {
      setTenants(tenants.map((t) => (t.id === tenant.id ? tenant : t)))
    }
    setOpenEditModal(false)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />

      <ActionButtons
        handleOpenAddModal={handleOpenAddModal}
        selectedSize={selectedTenants.size}
        handleExportPDF={handleExportPDF}
        handleExportExcel={handleExportExcel}
        handleOpenFilter={handleOpenFilter}
        handleDeleteSelected={handleDeleteSelected}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  onChange={handleSelectAll}
                  checked={selectedTenants.size === tenants.length}
                />
              </TableCell>
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
                <TableCell>
                  <Checkbox
                    checked={selectedTenants.has(tenant.id)}
                    onChange={() => handleSelectTenant(tenant.id)}
                  />
                </TableCell>
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

      <TablePagination
        rowsPerPageOptions={[3, 5, 10, { label: 'Todos', value: -1 }]}
        component="div"
        count={allTenants.length}
        rowsPerPage={perPage}
        page={page}
       
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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
