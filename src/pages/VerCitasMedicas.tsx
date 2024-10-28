import { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, TextField, 
  Button, CircularProgress, Alert, Chip, Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { differenceInHours } from 'date-fns';
import { AlertColor } from '@mui/material';

// Simulación de datos de citas (reemplazar con llamada a API real)
const mockCitas = [
  { id: 1, fecha: new Date('2024-11-5'), especialidad: 'Cardiología', medico: 'Dr. Juan Pérez', estado: 'activa' },
  { id: 2, fecha: new Date('2024-03-05'), especialidad: 'Dermatología', medico: 'Dra. Ana García', estado: 'completada' },
  { id: 3, fecha: new Date('2024-03-10'), especialidad: 'Pediatría', medico: 'Dr. Carlos Rodríguez', estado: 'cancelada' },
];

interface Cita {
  id: number;
  fecha: Date;
  especialidad: string;
  medico: string;
  estado: string;
}

export default function VerCitasMedicas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, ] = useState(null);
  const [filtroFecha, setFiltroFecha] = useState<Date | null>(null);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ 
    open: false, 
    message: '', 
    severity: 'info' 
  });

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setCitas(mockCitas);
      setLoading(false);
    }, 1000);
  }, []);

  const citasFiltradas = citas.filter(cita => 
    (!filtroFecha || new Date(cita.fecha).toDateString() === filtroFecha.toDateString()) &&
    (!filtroEstado || cita.estado === filtroEstado)
  );

  const limpiarFiltros = () => {
    setFiltroFecha(null);
    setFiltroEstado('');
  };

  const isCancelable = (cita: Cita): boolean => {
    return cita.estado === 'activa' && differenceInHours(cita.fecha, new Date()) > 24;
  };

  const handleCancelClick = (cita: Cita) => {
    setSelectedCita(cita);
    setOpenCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    setCancelLoading(true);
    // Simular proceso de cancelación
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCancelLoading(false);
    setOpenCancelDialog(false);
    // Actualizar el estado de la cita
    setCitas(prevCitas =>
      prevCitas.map(c => (selectedCita && c.id === selectedCita.id) ? {...c, estado: 'cancelada'} : c)
    );
    setSnackbar({ open: true, message: 'Cita cancelada con éxito', severity: 'success' });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Citas Médicas
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Filtrar por fecha"
              value={filtroFecha}
              onChange={(newValue) => setFiltroFecha(newValue)}
              slotProps={{ 
                textField: { fullWidth: true }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Filtrar por estado"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              fullWidth
              SelectProps={{
                native: true,
              }}
              InputLabelProps={{
                shrink: true
              }}
            >
              <option value="">Todos</option>
              <option value="activa">Activa</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" onClick={limpiarFiltros} fullWidth>
              Limpiar filtros
            </Button>
          </Grid>
        </Grid>

        {citasFiltradas.length === 0 ? (
          <Alert severity="info">No hay citas que coincidan con los filtros seleccionados.</Alert>
        ) : (
          <Grid container spacing={3}>
            {citasFiltradas.map((cita) => (
              <Grid item xs={12} sm={6} md={4} key={cita.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderLeft: 6,
                    borderColor: 
                      cita.estado === 'activa' ? 'primary.main' : 
                      cita.estado === 'completada' ? 'success.main' : 'error.main'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {cita.especialidad}
                    </Typography>
                    <Typography color="text.secondary">
                      {cita.fecha.toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      {cita.medico}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip 
                        label={cita.estado} 
                        color={
                          cita.estado === 'activa' ? 'primary' : 
                          cita.estado === 'completada' ? 'success' : 'error'
                        }
                        size="small"
                      />
                    </Box>
                    {cita.estado === 'activa' && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          Tiempo restante: {differenceInHours(cita.fecha, new Date())} horas
                        </Typography>
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          onClick={() => handleCancelClick(cita)}
                          disabled={!isCancelable(cita)}
                          sx={{ mt: 1 }}
                        >
                          Cancelar
                        </Button>
                        {!isCancelable(cita) && (
                          <Typography variant="caption" color="error">
                          No cancelable (menos de 12 horas)
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
          <DialogTitle>¿Confirmar cancelación de cita?</DialogTitle>
          <DialogContent>
            {selectedCita && (
              <>
                <Typography>Fecha y hora: {selectedCita.fecha.toLocaleString()}</Typography>
                <Typography>Especialidad: {selectedCita.especialidad}</Typography>
                <Typography>Médico: {selectedCita.medico}</Typography>
                <Typography color="error" sx={{ mt: 2 }}>
                  Advertencia: Las citas solo pueden ser canceladas con al menos 12 horas de anticipación.
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancelDialog(false)} color="inherit">
              Atrás
            </Button>
            <Button onClick={handleCancelConfirm} color="warning" disabled={cancelLoading}>
              {cancelLoading ? <CircularProgress size={24} /> : 'Sí, Cancelar'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}
