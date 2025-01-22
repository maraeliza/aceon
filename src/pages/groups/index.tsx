import React from 'react'
import { Container, Typography } from '@mui/material'
import GroupManagement from './GroupManagement'

function PageGroups() {
  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Permissões de Grupos
      </Typography>
      <GroupManagement />
    </Container>
  )
}

export default PageGroups
