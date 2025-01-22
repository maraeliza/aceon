import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material'

const ContactSupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      // Here you would send the data to your backend or support system.
      setSnackbarMessage('Mensagem enviada com sucesso!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setFormData({ name: '', email: '', subject: '', message: '' }) // Clear the form
    } else {
      setSnackbarMessage('Por favor, preencha todos os campos.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto', p: 2 }}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
        Contate o Suporte
      </Typography>

      {/* Instruções */}
      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}
      >
        Se você tiver alguma dúvida ou precisar de ajuda, preencha o formulário
        abaixo e nossa equipe de suporte entrará em contato com você o mais
        rápido possível.
      </Typography>

      {/* Formulário de Contato */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Seu Nome"
            variant="outlined"
            fullWidth
            value={formData.name}
            name="name"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Seu E-mail"
            variant="outlined"
            fullWidth
            value={formData.email}
            name="email"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Assunto"
            variant="outlined"
            fullWidth
            value={formData.subject}
            name="subject"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Sua Mensagem"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.message}
            name="message"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      {/* Botão de Enviar */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Enviar Mensagem
        </Button>
      </Box>

      {/* Snackbar de Feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ContactSupportPage
