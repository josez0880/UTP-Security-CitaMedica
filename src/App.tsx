import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import NuevaCita from './pages/NuevaCita.tsx';
import AgregarMuestras from './pages/AgregarMuestras.tsx'; // Importa la nueva página
import Layout from './components/Layout.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nueva-cita" element={<NuevaCita />} />
          <Route path="/agregar-muestras" element={<AgregarMuestras />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
