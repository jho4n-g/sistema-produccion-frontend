import AprediendoPage from './class/Aprendiendo';
import HomePage from './page/client/HomePage';
import HomeAdmin from './page/admin/HomeAdmin';
import Settings from './page/admin/indicadores/Settings';
import Atomizador from './page/admin/indicadores/Atomizador';
import DynamicTable from './page/client/DynamicTable';
import { Routes, Route, BrowserRouter } from 'react-router';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/atimizador" element={<Atomizador />} />
          <Route path="/DynamicTable" element={<DynamicTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
