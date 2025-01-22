import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditIcon from '@mui/icons-material/Edit'
import { blue } from '@mui/material/colors'
import AttributeModal from './modalEdit'

// Importando o modal de atributos

interface Attribute {
  name: string
  type: string
}

interface Entity {
  id: number
  name: string
  attributes: Attribute[]
}

const initialEntitiesList: Entity[] = [
  {
    id: 1,
    name: 'Produto',
    attributes: [
      { name: 'Nome', type: 'String' },
      { name: 'Preço', type: 'Number' },
    ],
  },
  {
    id: 2,
    name: 'Cliente',
    attributes: [
      { name: 'Nome', type: 'String' },
      { name: 'Email', type: 'String' },
    ],
  },
]

const PageEntities = () => {
  const [entities, setEntities] = useState<Entity[]>(initialEntitiesList)
  const [editEntity, setEditEntity] = useState<Entity | null>(null)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)

  const handleOpenEditModal = (entity: Entity) => {
    setEditEntity(entity)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setEditEntity(null)
    setOpenEditModal(false)
  }

  const handleSaveEdit = () => {
    if (editEntity) {
      const updatedEntities = entities.map((entity) =>
        entity.id === editEntity.id ? editEntity : entity,
      )
      setEntities(updatedEntities)
    }
    handleCloseEditModal()
  }

  const handleAddAttribute = () => {
    if (editEntity) {
      setEditEntity({
        ...editEntity,
        attributes: [...editEntity.attributes, { name: '', type: 'String' }],
      })
    }
  }

  const handleRemoveAttribute = (index: number) => {
    if (editEntity) {
      const updatedAttributes = editEntity.attributes.filter(
        (_, i) => i !== index,
      )
      setEditEntity({ ...editEntity, attributes: updatedAttributes })
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => {}}
        >
          <AddCircleIcon sx={{ mr: 1 }} /> Adicionar Nova Entidade
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table stickyHeader aria-label="tabela de entidades">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Nome da Entidade
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Atributos</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entities.map((entity) => (
                <TableRow hover key={entity.id}>
                  <TableCell>{entity.name}</TableCell>
                  <TableCell>
                    {entity.attributes.map((attr, index) => (
                      <Typography key={index}>
                        {attr.name} ({attr.type})
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEditModal(entity)}
                        sx={{ '&:hover': { backgroundColor: blue[100] } }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal de edição de atributos */}
      {editEntity && (
        <AttributeModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          editEntity={editEntity}
          setEditEntity={setEditEntity}
          handleSaveEdit={handleSaveEdit}
          handleAddAttribute={handleAddAttribute}
          handleRemoveAttribute={handleRemoveAttribute}
        />
      )}
    </Box>
  )
}

export default PageEntities
