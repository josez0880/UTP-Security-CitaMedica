import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Select, 
  MenuItem, 
  Box, 
  Container, 
  Paper, 
  Grid,
  IconButton,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import { 
  // Person as PersonIcon, 
  ExitToApp as ExitToAppIcon,
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type Role = 'patient' | 'doctor';

export default function SuperUserInterface() {
  const [role, setRole] = useState<Role>('patient');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleRoleChange = (event: SelectChangeEvent<Role>) => {
    const newRole = event.target.value as Role;
    setRole(newRole);
    if (newRole === 'doctor') {
      navigate('/VerAgendaDiariaMedica');
    } else {
      navigate('/Home');
    }
  };

  const handleLogout = () => {
    // Implementar lógica de cierre de sesión
    console.log('Cerrando sesión...');
  };

  const roleColor = role === 'doctor' ? theme.palette.primary.main : theme.palette.secondary.main;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={role === 'doctor' ? 'primary' : 'secondary'}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vista de SuperUsuario
          </Typography>
          <Select
            value={role}
            onChange={handleRoleChange}
            sx={{ mr: 2, color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
          >
            <MenuItem value="patient">Modo Paciente</MenuItem>
            <MenuItem value="doctor">Modo Médico</MenuItem>
          </Select>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Juan Pérez
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, bgcolor: roleColor }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
            Panel de Control - {role === 'doctor' ? 'Modo Médico' : 'Modo Paciente'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                startIcon={<DashboardIcon />}
                fullWidth
                sx={{ height: '100%', bgcolor: 'white', color: roleColor }}
              >
                {role === 'doctor' ? 'Ver Agenda' : 'Mis Citas'}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                startIcon={<CalendarIcon />}
                fullWidth
                sx={{ height: '100%', bgcolor: 'white', color: roleColor }}
              >
                {role === 'doctor' ? 'Registrar Diagnóstico' : 'Agendar Cita'}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                startIcon={<AssignmentIcon />}
                fullWidth
                sx={{ height: '100%', bgcolor: 'white', color: roleColor }}
              >
                {role === 'doctor' ? 'Expedientes' : 'Mi Historial'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}