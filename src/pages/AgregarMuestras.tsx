import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Snackbar, MenuItem } from '@mui/material';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AgregarMuestras() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Paciente'); // Puede ser 'Paciente' o 'Medico'
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Verificar si ya existe un registro con el mismo nombre y tipo
      const existingItems = await client.models.SistemaCitasMedicas.list({
        filter: { Nombre: { eq: nombre }, Tipo: { eq: tipo } }
      });

      if (existingItems.data.length > 0) {
        setSnackbar({ open: true, message: 'El registro ya existe' });
        return;
      }

      // Crear nuevo registro
      await client.models.SistemaCitasMedicas.create({
        PK: `${tipo.toUpperCase()}#${new Date().getTime()}`,
        SK: `${tipo.toUpperCase()}#${new Date().getTime()}`,
        Tipo: tipo,
        Nombre: nombre,
        // Agregar otros campos necesarios aquí
      });

      setSnackbar({ open: true, message: 'Registro creado con éxito' });
    } catch (error) {
      console.error("Error al crear el registro:", error);
      setSnackbar({ open: true, message: 'Error al crear el registro' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agregar Muestras
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                fullWidth
              >
                <MenuItem value="Paciente">Paciente</MenuItem>
                <MenuItem value="Medico">Medico</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Agregar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}
