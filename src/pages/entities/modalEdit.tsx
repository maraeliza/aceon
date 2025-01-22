import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material'
import { blue, red } from '@mui/material/colors'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CheckIcon from '@mui/icons-material/Check'

const AttributeModal = ({
  open,
  onClose,
  editEntity,
  setEditEntity,
  handleAddAttribute,
  handleRemoveAttribute,
  handleSaveEdit,
}: any) => {
  const handleAttributeChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    if (editEntity) {
      const updatedAttributes = [...editEntity.attributes]
      updatedAttributes[index][field] = value
      setEditEntity({ ...editEntity, attributes: updatedAttributes })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 600,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          padding: 3,
          boxShadow: 5,
          transition: 'all 0.3s ease',
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: blue[700], fontWeight: 'bold', marginBottom: 2 }}
        >
          Editar Entidade
        </Typography>

        <TextField
          label="Nome da Entidade"
          variant="outlined"
          fullWidth
          value={editEntity?.name || ''}
          onChange={(e) =>
            setEditEntity({ ...editEntity!, name: e.target.value })
          }
          sx={{ marginBottom: 2 }}
        />

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', color: blue[600] }}
          >
            Atributos
          </Typography>
          {editEntity?.attributes.map((attr: any, index: any) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}
            >
              <TextField
                label="Nome do Atributo"
                variant="outlined"
                value={attr.name}
                onChange={(e) =>
                  handleAttributeChange(index, 'name', e.target.value)
                }
                sx={{ marginRight: 2, flex: 1 }}
              />
              <FormControl sx={{ marginRight: 2, flex: 1 }}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={attr.type}
                  onChange={(e) =>
                    handleAttributeChange(
                      index,
                      'type',
                      e.target.value as string,
                    )
                  }
                  label="Tipo"
                >
                  <MenuItem value="String">Texto</MenuItem>
                  <MenuItem value="Number">Número</MenuItem>
                  <MenuItem value="Boolean">Booleano</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                color="error"
                onClick={() => handleRemoveAttribute(index)}
                sx={{
                  color: red[500],
                  '&:hover': { backgroundColor: red[50] },
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddAttribute}
            sx={{ borderRadius: '20px', marginBottom: 2 }}
            startIcon={<AddCircleIcon />}
          >
            Adicionar Atributo
          </Button>
        </Box>

        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
        >
          <Button
            onClick={onClose}
            sx={{
              marginRight: 2,
              color: 'gray',
              '&:hover': { backgroundColor: '#e0e0e0' },
              borderRadius: '20px',
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            color="primary"
            sx={{ borderRadius: '20px' }}
            startIcon={<CheckIcon />}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default AttributeModal
