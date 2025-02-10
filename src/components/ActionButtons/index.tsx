import { Badge, Box, IconButton, Tooltip } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import FilterListIcon from '@mui/icons-material/FilterList'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete' // Ícone de lixeira

// Tipagem correta para a função passada como parâmetro
interface ActionButtonsProps {
  selectedSize: number
  handleOpenAddModal: () => void
  handleDeleteSelected: () => void // Função para deletar os selecionados
  handleExportPDF: () => void
  handleExportExcel: () => void
  handleOpenFilter: () => void
}

export const ActionButtons = ({
  handleOpenAddModal,
  selectedSize,
  handleDeleteSelected,
  handleExportPDF,
  handleExportExcel,
  handleOpenFilter,
}: ActionButtonsProps) => {
  let auxText = ''
  if (selectedSize > 0) {
    auxText += '(apenas '
    if (selectedSize === 1) {
      auxText += ' o item selecionado)'
    } else {
      auxText += ` os ${selectedSize} itens selecionados)`
    }
  }

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
      {selectedSize > 0 && (
        <Tooltip
          title={`Excluir ${`${selectedSize} ${selectedSize === 1 ? 'item' : 'itens'} selecionado${selectedSize > 1 ? 's' : ''}`} `}
        >
          <IconButton
            onClick={handleDeleteSelected}
            sx={{
              backgroundColor: '#000',
              color: 'white',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#300',
                transform: 'scale(1.1)',
              },
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: 1.5,
            }}
          >
            <Badge
              badgeContent={selectedSize}
              color="secondary"
              overlap="circular"
              variant="dot"
            >
              <DeleteIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title={`Exportar para PDF ${auxText}`}>
        <IconButton
          onClick={handleExportPDF}
          sx={{
            backgroundColor: '#d32f2f',
            color: 'white',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#c62828',
              transform: 'scale(1.1)',
            },
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: 1.5,
          }}
        >
          <Badge
            badgeContent={selectedSize}
            color="secondary"
            overlap="circular"
            variant="dot"
          >
            <PictureAsPdfIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title={`Exportar para Excel ${auxText}`}>
        <IconButton
          onClick={handleExportExcel}
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
          <Badge
            badgeContent={selectedSize}
            color="secondary"
            overlap="circular"
            variant="dot"
          >
            <SaveAltIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Tooltip para Filtrar */}
      <Tooltip title="Filtrar">
        <IconButton
          onClick={handleOpenFilter}
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
