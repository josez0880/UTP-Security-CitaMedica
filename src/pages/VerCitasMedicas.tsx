import { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, TextField, 
  Button, CircularProgress, Alert, Chip, Box, MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

// Simulación de datos de citas (reemplazar con llamada a API real)
const mockCitas = [
  { id: 1, fecha: new Date('2024-03-01'), especialidad: 'Cardiología', medico: 'Dr. Juan Pérez', estado: 'activa' },
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
  const [error, setError] = useState(null);
  const [filtroFecha, setFiltroFecha] = useState<Date | null>(null);
  const [filtroEstado, setFiltroEstado] = useState('');

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
                native: false, // Cambiamos a false para usar MenuItem
              }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="activa">Activa</MenuItem>
              <MenuItem value="completada">Completada</MenuItem>
              <MenuItem value="cancelada">Cancelada</MenuItem>
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </LocalizationProvider>
  );
}
