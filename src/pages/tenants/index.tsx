import { Container } from '@mui/material'
import TabelaUsers from './TableUsers'

export const PageTenants = () => {
  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <TabelaUsers />
    </Container>
  )
}
