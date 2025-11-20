import AprediendoPage from './class/Aprendiendo';
import HomePage from './page/client/HomePage';
import HomeAdmin from './page/admin/HomeAdmin';
import Settings from './page/admin/secciones/Settings';
import DynamicTable from './page/client/DynamicTable';
import HomeAdminPage from './page/admin/HomeAdminPage';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router';
//layout
import MainLayout from './layouts/main.layout.jsx';
//admin
import UserPage from './page/admin/user-mangamen/UserPage';
import RolePage from './page/admin/user-mangamen/RolePage';
import Atomizador from './page/admin/secciones/Atomizador';
import LineaEsmaltacion from './page/admin/secciones/LineaEsmaltacion';
import MoliendoBarbotina from './page/admin/secciones/MoliendoBarbotina';
import PrensadoSecado from './page/admin/secciones/PrensadoSecado';
import SeleccionEmbalaje from './page/admin/secciones/SeleccionEmbalaje';
import SerigraficaDecorado from './page/admin/secciones/SerigrafiaDecorado';
//login
import LoginPage from './page/auth/LoginPage';

import { AuthProvider } from './providers/auth.provider.jsx';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route element={<HomeAdminPage />}>
              <Route path="/admin/user-page" element={<UserPage />} />
              <Route path="/admin/role-page" element={<RolePage />} />
              <Route
                path="/admin/linea-esmaltacion"
                element={<LineaEsmaltacion />}
              />
              <Route path="/admin/atomizado" element={<Atomizador />} />
              <Route
                path="/admin/moliendo-barbotina"
                element={<MoliendoBarbotina />}
              />
              <Route
                path="/admin/prensado-secado"
                element={<PrensadoSecado />}
              />
              <Route
                path="/admin/seleccion-embalaje"
                element={<SeleccionEmbalaje />}
              />
              <Route
                path="/admin/serigrafia-decorado"
                element={<SerigraficaDecorado />}
              />
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
