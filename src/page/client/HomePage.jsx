import * as React from 'react';
import { useState, useMemo } from 'react';
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
  CircularProgress,
} from '@mui/material';

import AssignmentIcon from '@mui/icons-material/Assignment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// Si usas estos también en las cards:
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

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

import BarbotinaAdminPage from '../../page/admin/secciones/MoliendoBarbotina';
import AtomizadoAdminPage from '../../page/admin/secciones/Atomizador';
import LineaEsmaltacionAdminPage from '../../page/admin/secciones/LineaEsmaltacion';
import PrensadoSecadoAdminPage from '../../page/admin/secciones/PrensadoSecado';
import SeleccionEmbalajeAdminPage from '../../page/admin/secciones/SeleccionEmbalaje';
import SerigrafiaDecoradoAdminPage from '../../page/admin/secciones/SerigrafiaDecorado';

import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';

import InicioPage from './InicioPage.jsx';

import useAuth from '../../hooks/auth.hook.jsx';
import { useNavigate } from 'react-router-dom';

// ————————————————————————————————————————————————
const makeTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#006633', contrastText: '#FFFFFF' }, // puedes cambiar por #1A7431 o #25A244
      secondary: { main: '#6E33FF', contrastText: '#FFFFFF' },
      info: { main: '#2D6BFF', contrastText: '#FFFFFF' },
      success: { main: '#2DC653', contrastText: '#0B1F12' }, // de tu paleta
      warning: { main: '#FFAB00', contrastText: '#1B1300' },
      error: { main: '#c04722ff', contrastText: '#FFFFFF' },
      ...(mode === 'dark'
        ? {
            background: { default: '#0e1111', paper: '#111416' },
            divider: 'rgba(255,255,255,0.12)',
            text: { primary: '#EAEAEA', secondary: '#BDBDBD' },
          }
        : {
            background: { default: '#F5F7FB', paper: '#FFFFFF' },
            divider: '#E5E7EB',
            text: { primary: '#0F172A', secondary: '#475569' },
          }),
      action: {
        selectedOpacity: 0.18,
        hoverOpacity: 0.08,
        focusOpacity: 0.12,
        activatedOpacity: 0.2,
      },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily:
        "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      h6: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 700, letterSpacing: 0.2 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body:
            theme.palette.mode === 'light' ? { backgroundImage: 'none' } : {},
        }),
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 2px 8px rgba(2,6,23,0.06)'
                : '0 2px 8px rgba(2,6,23,0.35)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 10,
            margin: '4px 8px',
            paddingLeft: 12,
            paddingRight: 12,
            '&.Mui-selected': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.mode === 'light' ? 0.18 : 0.28
              ),
              '&:hover': {
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  theme.palette.mode === 'light' ? 0.24 : 0.34
                ),
              },
            },
          }),
        },
      },
    },
  });
// ————————————————————————————————————————————————
const navItems = [
  {
    key: 'inicio',
    label: 'Inicio',
    icon: <HomeIcon />,
    roles: [
      'ControlMoliendoBarbotina',
      'ControlAtomizado',
      'ControlSeleccionEmbalane',
      'ControlLineaEsmaltacion',
      'ControlPrensadoSecado',
      'ControlSerigraficaDecorado',
    ],
  },
  {
    key: 'barbotina',
    label: 'Molienda Barbotina',
    icon: <HomeIcon />,
    roles: ['ControlMoliendoBarbotina'],
  },
  {
    key: 'historialBarbotina',
    label: 'Historial',
    icon: <ChecklistRtlIcon />,
    roles: ['ControlMoliendoBarbotina'],
  },
  {
    key: 'atomizado',
    label: 'Atomizado',
    icon: <AssignmentIcon />,
    roles: ['ControlAtomizado'],
  },
  {
    key: 'historiaAtomizado',
    label: 'Historial',
    icon: <ChecklistRtlIcon />,
    roles: ['ControlAtomizado'],
  },
  {
    key: 'seleccionEmbalaje',
    label: 'Selccion Embalaje',
    icon: <FactCheckIcon />,
    roles: ['ControlSeleccionEmbalane'],
  },
  {
    key: 'hitoriaEmbalaje',
    label: 'Historial',
    icon: <ChecklistRtlIcon />,
    roles: ['ControlSeleccionEmbalane'],
  },
  {
    key: 'esmaltacion',
    label: 'Linea de Esmaltacion',
    icon: <FactCheckIcon />,
    roles: ['ControlLineaEsmaltacion'],
  },
  {
    key: 'hitoriaEsmaltacion',
    label: 'Historial',
    icon: <ChecklistRtlIcon />,
    roles: ['ControlLineaEsmaltacion'],
  },
  {
    key: 'prensado',
    label: 'Prensado Secado',
    icon: <FactCheckIcon />,
    roles: ['ControlPrensadoSecado'],
  },
  {
    key: 'hitoriaPrensado',
    label: 'Historial',
    icon: <ChecklistRtlIcon />,
    roles: ['ControlPrensadoSecado'],
  },

  {
    key: 'serigrafica',
    label: 'Serigrafia y Decorado',
    icon: <FactCheckIcon />,
    roles: ['ControlSerigraficaDecorado'],
  },
  {
    key: 'hitoriaSerigrafia',
    label: 'Historial',
    icon: <ChecklistRtlIcon />,
    roles: ['ControlSerigraficaDecorado'],
  },
];
// App principal con AppBar y navegación superior
export default function AppBarTabsMockup() {
  const [section, setSection] = useState('inicio');
  const [mode, setMode] = useState('light');
  const theme = React.useMemo(() => makeTheme(mode), [mode]);
  const navigate = useNavigate();
  // Estado para menú de usuario
  const [userMenuEl, setUserMenuEl] = useState(null);
  const userMenuOpen = Boolean(userMenuEl);
  const { auth, loading } = useAuth();
  // console.log('auth ', auth);

  const handleOpenUser = (e) => setUserMenuEl(e.currentTarget);
  const handleCloseUser = () => setUserMenuEl(null);
  const handleGoPerfil = () => {
    setSection('perfil');
    handleCloseUser();
  };
  const handleLogout = () => {
    handleCloseUser();
    navigate('/login');
  };

  const userRoleNames = useMemo(
    () => auth?.roles?.map((role) => role.name) || [],
    [auth]
  );

  const filteredNavItems = useMemo(
    () =>
      navItems.filter((item) =>
        item.roles.some((requiredRole) => userRoleNames.includes(requiredRole))
      ),
    [userRoleNames]
  );

  // console.log('permisos', filteredNavItems);

  return (
    <ThemeProvider theme={theme}>
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
              Sistema de Produccion
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              {loading ? (
                <CircularProgress size={20} />
              ) : auth ? (
                filteredNavItems.length ? (
                  filteredNavItems.map((item) => (
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
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No tiene permisos asignados
                  </Typography>
                )
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay usuario autenticado
                </Typography>
              )}

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
          {section === 'inicio' && <InicioPage />}
          {section === 'barbotina' && <MoliendoBarbotina />}
          {section === 'atomizado' && <ControlAtomizadoPage />}
          {section === 'seleccionEmbalaje' && <ControlSeleccionEmbalaje />}
          {section === 'prensado' && <ControlPrensadoSecado />}
          {section === 'esmaltacion' && <ControlLineaEsmaltacion />}
          {section === 'serigrafica' && <ControlSerigrafiaDecorado />}
          {section === 'informeProduccion' && <InformeProduccion />}
          {section === 'historialBarbotina' && <BarbotinaAdminPage />}
          {section === 'historiaAtomizado' && <AtomizadoAdminPage />}
          {section === 'hitoriaEmbalaje' && <SeleccionEmbalajeAdminPage />}
          {section === 'hitoriaEsmaltacion' && <LineaEsmaltacionAdminPage />}
          {section === 'hitoriaPrensado' && <PrensadoSecadoAdminPage />}
          {section == 'hitoriaSerigrafia' && <SerigrafiaDecoradoAdminPage />}
        </Container>

        <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="caption">Hecho por forjadores</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
