'use client'
import React from 'react'
import { Box, Button, Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: 100, fontWeight: 'bold', color: 'text.primary' }}
        >
          404
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', marginBottom: 3 }}
        >
          Página não encontrada
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', marginBottom: 4 }}
        >
          A página que você está procurando não existe ou foi movida.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{
            paddingX: 3,
            paddingY: 1.5,
            textTransform: 'none',
            fontSize: '16px',
            boxShadow: 2,
          }}
        >
          Voltar para a Página Inicial
        </Button>
      </Box>
    </Container>
  )
}

export default NotFoundPage
