import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  Paper,
  Grid,
  Button,
} from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from '@mui/material/styles';
import { Link, Outlet } from 'react-router-dom';
import BlenderIcon from '@mui/icons-material/Blender';

import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoCeramica from '../../assets/CeramicaCoboce.png';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import Inventory2Icon from '@mui/icons-material/Inventory2';

/* =============== THEME (con tu paleta) =============== */
const makeTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#006633', contrastText: '#FFFFFF' }, // puedes cambiar por #1A7431 o #25A244
      secondary: { main: '#6E33FF', contrastText: '#FFFFFF' },
      info: { main: '#2D6BFF', contrastText: '#FFFFFF' },
      success: { main: '#2DC653', contrastText: '#0B1F12' }, // de tu paleta
      warning: { main: '#FFAB00', contrastText: '#1B1300' },
      error: { main: '#E94C1D', contrastText: '#FFFFFF' },
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

/* =============== Drawer mini-variant (JS) =============== */
const DRAWER_WIDTH = 250;
const CLOSED_WIDTH = 72;

const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  width: CLOSED_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

/* ========================= App ========================= */
export default function App() {
  const [mode] = React.useState('light'); // cambia a 'dark' si quieres
  const theme = React.useMemo(() => makeTheme(mode), [mode]);

  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState('Dashboard');

  const mainMenu = [
    {
      text: 'Gestion de Usuarios',
      icon: <InboxIcon />,
      path: '/admin/user-page',
    },
    { text: 'Gestion de Roles', icon: <MailIcon />, path: '/admin/role-page' },
    {
      text: 'Informe Produccion',
      icon: <MailIcon />,
      path: '/admin/role-page',
    },
  ];

  const control_proceso = [
    {
      text: 'Moliendo Barbotina',
      icon: <BlenderIcon />,
      path: '/admin/moliendo-barbotina',
    },
    { text: 'Atomizado', icon: <BlurOnIcon />, path: '/admin/atomizado' },
    {
      text: 'Prensado y Secado',
      icon: <LocalFireDepartment />,
      path: '/admin/prensado-secado',
    },
    {
      text: 'Linea de esmaltacion',
      icon: <FormatPaintIcon />,
      path: '/admin/linea-esmaltacion',
    },
    {
      text: 'Serigrafica y decorado',
      icon: <ColorLensIcon />,
      path: '/admin/serigrafia-decorado ',
    },
    {
      text: 'Seleccion y Embalaje',
      icon: <Inventory2Icon />,
      path: '/admin/seleccion-embalaje',
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {/* APP BAR */}
        <AppBar
          position="fixed"
          elevation={2}
          sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ minHeight: 64, px: 2 }}>
            <IconButton
              edge="start"
              onClick={() => setOpen((o) => !o)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo + nombre */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box>
                <img
                  src={LogoCeramica}
                  alt=""
                  style={{ width: '100px', height: 'auto' }}
                />
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              Administracion
            </Typography>
            <Avatar sx={{ width: 32, height: 32 }}>E</Avatar>
          </Toolbar>
        </AppBar>

        {/* DRAWER MINI VARIANT */}
        <Drawer variant="permanent" open={open}>
          <Toolbar />

          <Divider />

          {/* NAV */}
          <List sx={{ px: open ? 1 : 0 }}>
            {mainMenu.map((item) => {
              const active = selected === item.text;
              const button = (
                <ListItemButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  selected={active}
                  onClick={() => setSelected(item.text)}
                  sx={{
                    px: open ? 1.5 : 1,
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1.5 : 0,
                      justifyContent: 'center',
                      color: active ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: active ? 600 : 500,
                      }}
                    />
                  )}
                </ListItemButton>
              );

              return (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  {open ? (
                    button
                  ) : (
                    <Tooltip title={item.text} placement="right">
                      {button}
                    </Tooltip>
                  )}
                </ListItem>
              );
            })}
          </List>

          <Box sx={{ px: !open ? 2 : 0 }}>
            {open ? (
              <Divider>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={13}
                  sx={{ mr: 1 }}
                >
                  Control Procesos
                </Typography>
              </Divider>
            ) : (
              <Divider />
            )}
          </Box>

          <List sx={{ px: open ? 1 : 0 }}>
            {control_proceso.map((item) => {
              const active = selected === item.text;
              const button = (
                <ListItemButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  selected={active}
                  onClick={() => setSelected(item.text)}
                  sx={{
                    px: open ? 1.5 : 1,
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1.5 : 0,
                      justifyContent: 'center',
                      color: active ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: active ? 600 : 500,
                      }}
                    />
                  )}
                </ListItemButton>
              );

              return (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  {open ? (
                    button
                  ) : (
                    <Tooltip title={item.text} placement="right">
                      {button}
                    </Tooltip>
                  )}
                </ListItem>
              );
            })}
          </List>

          <Box sx={{ flexGrow: 1 }} />
        </Drawer>

        {/* MAIN */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
