import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import NuevaCita from './pages/NuevaCita.tsx';
// import AgregarMuestras from './pages/AgregarMuestras.tsx'; // Importa la nueva página
import Layout from './components/Layout.tsx';
import VerCitasMedicas from './pages/VerCitasMedicas.tsx';
import VerAgendaDiariaMedica from './pages/VerAgendaDiariaMedica.tsx';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
function App() {
  return (
    <Router>
      <React.StrictMode>
        <Authenticator>
          <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/nueva-cita" element={<NuevaCita />} />
            <Route path="/ver-citas" element={<VerCitasMedicas />} /> 
            <Route path="/ver-agenda-diaria" element={<VerAgendaDiariaMedica />} />
          </Route>
          </Routes>
        </Authenticator>
      </React.StrictMode>
    </Router>
  );
}

export default App;
