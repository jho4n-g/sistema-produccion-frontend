import * as React from 'react';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress,
  Stack,
  Paper,
  Divider,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import AssignmentIcon from '@mui/icons-material/Assignment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// Si usas estos también en las cards:

import HomeIcon from '@mui/icons-material/Home';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//control de procesos
import MoliendoBarbotina from '../client//ControProcesos/ControMoliendaBarbotina';
import ControlAtomizadoPage from '../client/ControProcesos/ControlAtomizado';
import ControlSeleccionEmbalaje from './ControProcesos/ControlSeleccionEmbalaje';
import ControlPrensadoSecado from './ControProcesos/ControlPrensadoSecado';
import ControlLineaEsmaltacion from './ControProcesos/ControlLineaEsmaltacion';
import ControlSerigrafiaDecorado from './ControProcesos/ControlSerigrafiaDecorado';
import InformeProduccion from './JefeProduccion/InformeProduccion';

// ————————————————————————————————————————————————

const TODAY = new Date();

// ————————————————————————————————————————————————
// App principal con AppBar y navegación superior
export default function AppBarTabsMockup() {
  const [section, setSection] = useState('inicio');

  // Estado para menú de usuario
  const [userMenuEl, setUserMenuEl] = useState(null);
  const userMenuOpen = Boolean(userMenuEl);

  const handleOpenUser = (e) => setUserMenuEl(e.currentTarget);
  const handleCloseUser = () => setUserMenuEl(null);
  const handleGoPerfil = () => {
    setSection('perfil');
    handleCloseUser();
  };
  const handleLogout = () => {
    alert('Sesión cerrada (demo)');
    handleCloseUser();
  };

  const navItems = [
    { key: 'inicio', label: 'Molienda Barbotina', icon: <HomeIcon /> },
    { key: 'registros', label: 'Atomizado', icon: <AssignmentIcon /> },
    { key: 'datos', label: 'Selccion Embalaje', icon: <FactCheckIcon /> },
    { key: 'prensado', label: 'Prensado Secado', icon: <FactCheckIcon /> },
    {
      key: 'esmaltacion',
      label: 'Linea de Esmaltacion',
      icon: <FactCheckIcon />,
    },
    {
      key: 'serigrafica',
      label: 'Serigrafia y Decorado',
      icon: <FactCheckIcon />,
    },
    {
      key: 'informeProduccion',
      label: 'Informe Porduccon',
      icon: <FactCheckIcon />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: (t) =>
          t.palette.mode === 'light' ? '#f6f8fb' : 'background.default',
      }}
    >
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          height: 85,
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          boxShadow: '0 2px 8px rgba(2,6,23,0.06)',
          borderBottom: '1px solid #E5E7EB',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
            Sistema de indicadores
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            {navItems.map((item) => (
              <Button
                key={item.key}
                startIcon={item.icon}
                onClick={() => setSection(item.key)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 999,
                  px: 2,
                  ...(section === item.key
                    ? { bgcolor: '#006633', color: '#FFFFFF' }
                    : { bgcolor: '#E5E7EB', color: '#0F172A' }),
                  '&:hover': {
                    ...(section === item.key
                      ? { bgcolor: '#065d2e' }
                      : { bgcolor: '#dfe4ea' }),
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* Botón de usuario (sin foto) */}
            <Tooltip title="Cuenta">
              <IconButton onClick={handleOpenUser} sx={{ ml: 1 }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={userMenuEl}
              open={userMenuOpen}
              onClose={handleCloseUser}
            >
              <MenuItem onClick={handleGoPerfil}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Ver perfil</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cerrar sesión</ListItemText>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false}>
        {section === 'inicio' && <MoliendoBarbotina />}
        {section === 'registros' && <ControlAtomizadoPage />}
        {section === 'datos' && <ControlSeleccionEmbalaje />}
        {section === 'prensado' && <ControlPrensadoSecado />}
        {section === 'esmaltacion' && <ControlLineaEsmaltacion />}
        {section === 'serigrafica' && <ControlSerigrafiaDecorado />}
        {section === 'informeProduccion' && <InformeProduccion />}
      </Container>

      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="caption">Hecho por forjadores</Typography>
      </Box>
    </Box>
  );
}
