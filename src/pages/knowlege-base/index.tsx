import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const KnowledgeBasePage = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', p: 2 }}>
      {/* Barra de Pesquisa */}
      <Stack direction="row" spacing={2} sx={{ mb: 4, alignItems: 'center' }}>
        <TextField
          label="Pesquisar artigos"
          variant="outlined"
          fullWidth
          sx={{ flex: 1 }}
        />
        <IconButton color="primary" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Stack>

      {/* Grid para Exibição de Categorias e Artigos */}
      <Grid container spacing={4}>
        {/* Lista de Categorias */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Categorias
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Introdução" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Configurações" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Soluções de Problemas" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Avançado" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Lista de Artigos */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Artigos Recentes
            </Typography>

            {/* Artigos Listados */}
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Como Configurar Sua Conta
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  5 minutos para configurar sua conta e começar a usar a
                  plataforma.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Solução para Erro de Login
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Se você está enfrentando problemas ao fazer login, veja como
                  resolver.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Personalizando as Configurações
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Aprenda como ajustar as configurações para atender às suas
                  necessidades.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Integração com Google Sheets
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Passos simples para integrar sua plataforma com o Google
                  Sheets.
                </Typography>
              </Box>
            </Stack>

            {/* Botão para Ver Todos os Artigos */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="contained" color="primary">
                Ver Todos os Artigos
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 5,
          textAlign: 'center',
          py: 3,
          bgcolor: 'background.default',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &copy; 2025 Base de Conhecimento | Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  )
}

export default KnowledgeBasePage
