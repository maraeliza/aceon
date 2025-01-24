import { Container } from '@mui/material'
import TabelaPaises from './Content'

export const PageCountries = () => {
  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <TabelaPaises />
    </Container>
  )
}
