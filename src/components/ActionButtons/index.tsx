import { Box, IconButton, Tooltip } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import FilterListIcon from '@mui/icons-material/FilterList'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import AddIcon from '@mui/icons-material/Add' // Certificando-se de importar o ícone de adicionar

// Tipagem correta para a função passada como parâmetro
interface ActionButtonsProps {
  handleOpenAddModal: () => void
}

export const ActionButtons = ({ handleOpenAddModal }: ActionButtonsProps) => {
  return (
    <Box
      gap={2}
      style={{
        float: 'right',
        display: 'flex',
        alignItems: 'center',
        margin: 10,
      }}
    >
      <Tooltip title="Exportar para PDF">
        <IconButton
          sx={{
            backgroundColor: '#d32f2f',
            color: 'white',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#b71c1c',
              transform: 'scale(1.1)',
            },
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: 1.5,
          }}
        >
          <PictureAsPdfIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Exportar em Excel">
        <IconButton
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#1565c0',
              transform: 'scale(1.1)',
            },
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: 1.5,
          }}
        >
          <SaveAltIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Filtrar">
        <IconButton
          sx={{
            backgroundColor: '#ff9800',
            color: 'white',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#f57c00',
              transform: 'scale(1.1)',
            },
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: 1.5,
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Adicionar Novo">
        <IconButton
          onClick={handleOpenAddModal}
          sx={{
            backgroundColor: '#4caf50',
            color: 'white',
            borderRadius: '8px', 
            '&:hover': {
              backgroundColor: '#388e3c',
              transform: 'scale(1.1)',
            },
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: 1.5,
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
