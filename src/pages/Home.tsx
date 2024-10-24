import { 
  Button, 
  Container, 
  Grid, 
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Simulación de citas existentes
const citasExistentes = [
  { id: 1, fecha: '2024-03-15', hora: '09:00', doctor: 'Dr. García' },
  { id: 2, fecha: '2024-03-16', hora: '14:30', doctor: 'Dra. Rodríguez' },
  { id: 3, fecha: '2024-03-17', hora: '11:15', doctor: 'Dr. Martínez' },
];

export default function Home() {
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              component={Link}
              to="/nueva-cita"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<AddIcon />}
              fullWidth
            >
              Crear Nueva Cita
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Citas Existentes"
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                {citasExistentes.map((cita) => (
                  <ListItem key={cita.id} divider>
                    <ListItemText
                      primary={`${cita.fecha} - ${cita.hora}`}
                      secondary={cita.doctor}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
