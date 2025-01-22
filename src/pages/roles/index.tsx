import React from 'react'
import { Container, Typography } from '@mui/material'
import GroupManagement from './GroupManagement'

function PageRoles() {
  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Papéis
      </Typography>
      <GroupManagement />
    </Container>
  )
}

export default PageRoles
