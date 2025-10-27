import * as React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';

const expandedWidth = 240;
const collapsedWidth = 72;

function NavItem({ icon, label, collapsed }) {
  return (
    <Tooltip title={collapsed ? label : ''} placement="right">
      <ListItemButton
        sx={{
          px: collapsed ? 1.5 : 2,
          py: 1,
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: (t) => alpha(t.palette.primary.main, 0.08),
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: 'inherit',
            minWidth: 0,
            mr: collapsed ? 0 : 2,
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={label}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        )}
      </ListItemButton>
    </Tooltip>
  );
}

export default function AppBarOverSidebar() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [collapsed, setCollapsed] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light', // Fondo blanco solicitado
          primary: { main: '#006d18ff' },
          background: { default: '#ffffff', paper: '#ffffff' },
          text: { primary: '#000000ff' },
        },
        shape: { borderRadius: 10 },
        typography: {
          fontFamily:
            'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial',
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
                borderBottom: '1px solid rgba(15,23,42,0.08)',
              },
            },
          },
        },
      }),
    [prefersDark]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        {/* AppBar: ENCIMA del sidebar (z-index mayor) */}
        <AppBar
          position="fixed"
          color="default"
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.primary',
            zIndex: (t) => t.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                color="inherit"
                onClick={() => setCollapsed((v) => !v)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" fontWeight={700}>
                Dashboard
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Notificaciones">
                <IconButton color="inherit">
                  <Badge badgeContent={3} color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Perfil">
                <IconButton color="inherit">
                  <Avatar src="https://i.pravatar.cc/100?img=13" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar permanente: deja espacio superior igual a la barra */}
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : expandedWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: collapsed ? collapsedWidth : expandedWidth,
              transition: 'width 0.3s',
              overflowX: 'hidden',
              borderRight: '1px solid rgba(15,23,42,0.08)',
              bgcolor: 'background.paper',
            },
          }}
          open
        >
          {/* Separador para que el contenido del drawer empiece debajo del AppBar */}
          <Toolbar />

          <List>
            <NavItem
              icon={<DashboardIcon />}
              label="Dashboard"
              collapsed={collapsed}
            />
            <NavItem
              icon={<InsightsIcon />}
              label="Analytics"
              collapsed={collapsed}
            />
            <NavItem
              icon={<AssignmentTurnedInIcon />}
              label="Tareas"
              collapsed={collapsed}
            />
            <NavItem
              icon={<CalendarMonthIcon />}
              label="Reportes"
              collapsed={collapsed}
            />
            <Divider sx={{ my: 1 }} />
            <NavItem
              icon={<SettingsIcon />}
              label="Configuración"
              collapsed={collapsed}
            />
          </List>
        </Drawer>

        {/* Contenido principal */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Empuja el contenido debajo del AppBar */}
          <Toolbar />
          <Typography variant="h5" fontWeight={800} gutterBottom>
            Contenido Principal
          </Typography>
          <Typography variant="body1" color="text.secondary">
            El AppBar está por encima del sidebar y el fondo es blanco. El botón
            del AppBar abre/cierra el modo compacto del sidebar (solo logos al
            cerrar).
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
