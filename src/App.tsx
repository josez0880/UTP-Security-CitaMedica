import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import NuevaCita from './pages/NuevaCita.tsx';
// import AgregarMuestras from './pages/AgregarMuestras.tsx'; // Importa la nueva página
import Layout from './components/Layout.tsx';
import VerCitasMedicas from './pages/VerCitasMedicas.tsx';
import VerAgendaDiariaMedica from './pages/VerAgendaDiariaMedica.tsx';
import SuperUserInterface from './pages/SuperUserInterface.tsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SuperUserInterface />} />
          <Route path="/nueva-cita" element={<NuevaCita />} />
          <Route path="/ver-citas" element={<VerCitasMedicas />} /> 
          <Route path="/ver-agenda-diaria" element={<VerAgendaDiariaMedica />} />
          <Route path="/home" element={<Home />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
