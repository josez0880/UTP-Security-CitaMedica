import  { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Paper,
  Snackbar,
  CircularProgress,
  Step,
  Stepper,
  StepLabel,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { addDays, isBefore, isAfter } from 'date-fns';

const especialidades = [
  { value: 'general', label: 'Medicina General' },
  { value: 'cardiologia', label: 'Cardiología' },
  { value: 'dermatologia', label: 'Dermatología' },
  { value: 'pediatria', label: 'Pediatría' },
];

export default function NuevaCita() {
  const [activeStep, setActiveStep] = useState(0);
  const [fecha, setFecha] = useState<Date | null>(null);
  const [especialidad, setEspecialidad] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const [citaConfirmada, setCitaConfirmada] = useState({
    fecha: null as Date | null,
    hora: '',
    especialidad: '',
    medico: '',
  });

  const validarFecha = (date: Date | null): boolean => {
    if (!date) return false;
    const hoy = new Date();
    const minDate = addDays(hoy, 1);
    const maxDate = addDays(hoy, 30);
    return !isBefore(date, minDate) && !isAfter(date, maxDate);
  };

  const handleBuscarDisponibilidad = async () => {
    if (!validarFecha(fecha) || !especialidad) {
      setSnackbar({ open: true, message: 'Por favor, seleccione una fecha válida y una especialidad.', severity: 'error' });
      return;
    }

    setLoading(true);
    // Simular una llamada a la API para buscar disponibilidad
    setTimeout(() => {
      // Simulación de respuesta exitosa
      setCitaConfirmada({
        fecha: fecha,
        hora: '10:00',
        especialidad: especialidades.find(e => e.value === especialidad)?.label || '',
        medico: 'Dr. García',
      });
      setActiveStep(1);
      setLoading(false);
    }, 1500);
  };

  const handleConfirmarCita = async () => {
    setLoading(true);
    // Simular una llamada a la API para confirmar la cita
    setTimeout(() => {
      setSnackbar({ open: true, message: 'Cita creada exitosamente. Se ha enviado un correo con los detalles.', severity: 'success' });
      setLoading(false);
      // Aquí se podría redirigir al usuario a la página de inicio o de citas
    }, 1500);
  };

  const handleVolver = () => {
    if (activeStep === 0) {
      // Aquí se podría implementar la navegación de vuelta al Home
      console.log('Volver al Home');
    } else {
      setActiveStep(0);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item>
              <IconButton onClick={handleVolver} aria-label="volver">
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" component="h1">
                Nueva Cita Médica
          </Typography>
            </Grid>
          </Grid>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            <Step>
              <StepLabel>Selección</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirmación</StepLabel>
            </Step>
          </Stepper>

          {activeStep === 0 ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DatePicker
                  label="Fecha de la cita"
                  value={fecha}
                  onChange={(newValue) => setFecha(newValue)}
                  slotProps={{ 
                    textField: { fullWidth: true }
                  }}
                  shouldDisableDate={(date) => !validarFecha(date)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Especialidad"
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                  fullWidth
                >
                  {especialidades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleBuscarDisponibilidad}
                  disabled={loading || !fecha || !especialidad}
                >
                  {loading ? <CircularProgress size={24} /> : 'Buscar disponibilidad'}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Resumen de la Cita</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Fecha: {citaConfirmada.fecha?.toLocaleDateString()}</Typography>
                <Typography>Hora: {citaConfirmada.hora}</Typography>
                <Typography>Especialidad: {citaConfirmada.especialidad}</Typography>
                <Typography>Médico: {citaConfirmada.medico}</Typography>
                <Typography sx={{ mt: 2 }}>Duración: 20 minutos</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleConfirmarCita}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Confirmar Cita'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => setActiveStep(0)}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          )}
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
