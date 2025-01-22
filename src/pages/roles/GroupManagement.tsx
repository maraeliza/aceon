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
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Delete, Edit, Add } from '@mui/icons-material'
import { Group, GroupTableProps } from '@/utils/interfaces'
import { initialGroups } from './data'

const predefinedPermissions: string[] = ['Read', 'Write', 'Execute', 'Delete']

const GroupTable: React.FC<GroupTableProps> = () => {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [newUser, setNewUser] = useState<string>('')
  const [newPermission, setNewPermission] = useState<string>('')
  const [newGroupName, setNewGroupName] = useState<string>('')

  const handleOpen = (group: Group | null = null): void => {
    setSelectedGroup(group)
    setOpen(true)
    if (!group) setNewGroupName('')
  }

  const handleClose = (): void => {
    setOpen(false)
    setSelectedGroup(null)
    setNewUser('')
    setNewPermission('')
    setNewGroupName('')
  }

  const addUser = (): void => {
    if (newUser.trim() && selectedGroup) {
      setSelectedGroup({
        ...selectedGroup,
        users: [...selectedGroup.users, newUser.trim()],
      })
      setNewUser('')
    }
  }

  const removeUser = (user: string): void => {
    if (selectedGroup) {
      setSelectedGroup({
        ...selectedGroup,
        users: selectedGroup.users.filter((u) => u !== user),
      })
    }
  }

  const addPermission = (): void => {
    if (newPermission.trim() && selectedGroup) {
      setSelectedGroup({
        ...selectedGroup,
        permissions: [...selectedGroup.permissions, newPermission.trim()],
      })
      setNewPermission('')
    }
  }

  const removePermission = (permission: string): void => {
    if (selectedGroup) {
      setSelectedGroup({
        ...selectedGroup,
        permissions: selectedGroup.permissions.filter((p) => p !== permission),
      })
    }
  }

  const saveChanges = (): void => {
    if (selectedGroup) {
      setGroups(
        groups.map((group) =>
          group.id === selectedGroup.id ? selectedGroup : group,
        ),
      )
      handleClose()
    }
  }

  const createGroup = (): void => {
    if (newGroupName.trim()) {
      const newGroup: Group = {
        id: groups.length + 1,
        name: newGroupName.trim(),
        createdBy: 'Admin', // Example static value
        createdAt: new Date().toLocaleString(),
        lastModifiedAt: new Date().toLocaleString(),
        lastModifiedBy: 'Admin', // Example static value
        users: [],
        permissions: [],
        description: '',
      }
      setGroups([...groups, newGroup])
      setNewGroupName('')
      handleClose()
    }
  }

  const deleteGroup = (id: number): void => {
    setGroups(groups.filter((group) => group.id !== id))
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        style={{ marginBottom: '20px' }}
      >
        Criar Novo Papel
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Criado Por</TableCell>
              <TableCell>Data de Criação</TableCell>
              <TableCell>Última Modificação</TableCell>
              <TableCell>Editado Por</TableCell>
              <TableCell>Nº de Usuários</TableCell>
              <TableCell>Nº de Permissões</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.createdBy}</TableCell>
                <TableCell>{group.createdAt}</TableCell>
                <TableCell>{group.lastModifiedAt}</TableCell>
                <TableCell>{group.lastModifiedBy}</TableCell>
                <TableCell>{group.users.length}</TableCell>
                <TableCell>{group.permissions.length}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(group)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteGroup(group.id)}
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
            {selectedGroup
              ? `Editar Papel: ${selectedGroup.name}`
              : 'Criar Novo Papel'}
          </Typography>

          {/* Nome do Papel */}
          <TextField
            label="Nome do Papel"
            value={newGroupName || selectedGroup?.name}
            onChange={(e) => setNewGroupName(e.target.value)}
            fullWidth
            size="small"
            margin="normal"
          />

          {/* Usuários */}
          <Typography variant="subtitle1">Usuários</Typography>
          <List>
            {selectedGroup?.users.map((user, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton onClick={() => removeUser(user)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="Adicionar Usuário"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              size="small"
            />
            <Button variant="contained" onClick={addUser}>
              Adicionar
            </Button>
          </Box>

          {/* Permissões */}
          <Typography variant="subtitle1">Permissões</Typography>
          <List>
            {selectedGroup?.permissions.map((permission, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton onClick={() => removePermission(permission)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText primary={permission} />
              </ListItem>
            ))}
          </List>
          <Box display="flex" gap={2} mb={2}>
            <Select
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              displayEmpty
              size="small"
              fullWidth
            >
              <MenuItem value="" disabled>
                Selecione uma Permissão
              </MenuItem>
              {predefinedPermissions.map((perm, index) => (
                <MenuItem key={index} value={perm}>
                  {perm}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" onClick={addPermission}>
              Adicionar
            </Button>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={selectedGroup ? saveChanges : createGroup}
            >
              {selectedGroup ? 'Salvar' : 'Criar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default GroupTable
