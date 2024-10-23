import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Paper,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const tiposCita = [
  { value: 'general', label: 'Consulta General' },
  { value: 'especialidad', label: 'Especialidad' },
  { value: 'seguimiento', label: 'Seguimiento' },
];

const medicos = [
  { value: 'garcia', label: 'Dr. García' },
  { value: 'rodriguez', label: 'Dra. Rodríguez' },
  { value: 'martinez', label: 'Dr. Martínez' },
];

const client = generateClient<Schema>();

export default function NuevaCita() {
  const [fecha, setFecha] = useState<Date | null>(null);
  const [tipoCita, setTipoCita] = useState('');
  const [medico, setMedico] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await client.models.SistemaCitasMedicas.create({
        PK: `CITA#${new Date().getTime()}`,
        SK: `PACIENTE#1`, // Cambia esto según el paciente actual
        Tipo: tipoCita,
        Fecha_Hora: fecha?.toISOString() || '',
        Estado: 'Programada',
        MedicoID: `MEDICO#${medico}`,
        // Agrega otros campos necesarios aquí
      });

      setSnackbar({ open: true, message: 'Cita creada con éxito' });
    } catch (error) {
      console.error("Error al crear la cita:", error);
      setSnackbar({ open: true, message: 'Error al crear la cita' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Crear Nueva Cita Médica
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DatePicker
                  label="Fecha de la cita"
                  value={fecha}
                  onChange={(newValue) => setFecha(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Tipo de cita"
                  value={tipoCita}
                  onChange={(e) => setTipoCita(e.target.value)}
                  fullWidth
                >
                  {tiposCita.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Médico"
                  value={medico}
                  onChange={(e) => setMedico(e.target.value)}
                  fullWidth
                >
                  {medicos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Confirmar Cita'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </LocalizationProvider>
  );
}
