import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Paper,
  IconButton,
  Divider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Desenvolvedor de software na empresa XYZ',
    avatar: '', // URL do avatar
  })
  const [isEditing, setIsEditing] = useState(false)
  const [newProfileData, setNewProfileData] = useState(profileData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProfileData({
      ...newProfileData,
      [name]: value,
    })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProfileData({
          ...newProfileData,
          avatar: reader.result as string,
        })
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleSaveProfile = () => {
    setProfileData(newProfileData)
    setIsEditing(false)
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 900, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
        Meu Perfil
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        {/* Foto de Perfil */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            src={newProfileData.avatar || 'https://via.placeholder.com/150'}
            alt="Foto de Perfil"
            sx={{ width: 120, height: 120, margin: '0 auto' }}
          />
          {isEditing && (
            <Box sx={{ mt: 1 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload">
                <IconButton color="primary" component="span">
                  <EditIcon />
                </IconButton>
              </label>
            </Box>
          )}
        </Box>

        {/* Informações do Perfil */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={newProfileData.name}
              name="name"
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              value={newProfileData.email}
              name="email"
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              value={newProfileData.bio}
              name="bio"
              onChange={handleInputChange}
              disabled={!isEditing}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Botões */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveProfile}
            >
              Salvar
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditProfile}
            >
              Editar Perfil
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default ProfilePage
