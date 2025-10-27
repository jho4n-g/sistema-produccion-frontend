import * as React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// —— COBOCE: color institucional
const coboceGreen = '#006633';

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

// —— Tarjeta KPI con acentos en verde COBOCE
function StatCard({ title, value, trend = 0 }) {
  const up = trend >= 0;
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        borderColor: (t) => alpha(t.palette.primary.main, 0.25),
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={800}>
            {value}
          </Typography>
          <Stack direction="row" gap={1} alignItems="center" mt={1}>
            <Chip
              size="small"
              icon={
                up ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )
              }
              label={`${up ? '+' : ''}${trend}%`}
              sx={{
                bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                color: 'primary.main',
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              vs mes anterior
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 2,
            bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
          }}
        />
      </Stack>
      <Box mt={2}>
        <LinearProgress
          variant="determinate"
          value={Math.min(100, Math.max(0, 50 + trend))}
        />
      </Box>
    </Paper>
  );
}

// —— Gráfico de "área" mínimo sin librerías externas (decorativo)
function MiniArea() {
  return (
    <Box
      sx={{
        height: 180,
        borderRadius: 2,
        border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
        overflow: 'hidden',
        position: 'relative',
        background: (t) =>
          `linear-gradient(180deg, ${alpha(
            t.palette.primary.main,
            0.12
          )} 0%, transparent 60%)`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          backgroundSize: '12px 12px',
          backgroundImage:
            'linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)',
        }}
      />
      <Box sx={{ position: 'absolute', inset: 0, p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Producción (t/m)
        </Typography>
        <Typography variant="h6" fontWeight={800}>
          12.4k
        </Typography>
      </Box>
    </Box>
  );
}

// —— Tabla simple para ver primarios en botones y chips
function SimpleTable() {
  const rows = [
    {
      id: 1,
      indicador: 'Índice de Severidad',
      periodo: '2025-09',
      estado: 'Pendiente',
    },
    {
      id: 2,
      indicador: 'Ingreso por Ventas',
      periodo: '2025-10',
      estado: 'Entregado',
    },
    {
      id: 3,
      indicador: 'Índice de Frecuencia',
      periodo: '2025-10',
      estado: 'Vencido',
    },
  ];
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: 2 }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Indicador</TableCell>
            <TableCell>Periodo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.indicador}</TableCell>
              <TableCell>{r.periodo}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={r.estado}
                  color={
                    r.estado === 'Entregado'
                      ? 'success'
                      : r.estado === 'Vencido'
                      ? 'error'
                      : 'default'
                  }
                  variant={r.estado === 'Pendiente' ? 'outlined' : 'filled'}
                />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" gap={1} justifyContent="flex-end">
                  <Button size="small" variant="outlined" color="primary">
                    Detalle
                  </Button>
                  <Button size="small" variant="contained" color="primary">
                    Acción
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
          primary: { main: coboceGreen }, // Verde COBOCE
          background: { default: '#ffffff', paper: '#ffffff' },
          text: { primary: '#0f172a' },
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
        {/* AppBar: ENCIMA del sidebar */}
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
                Dashboard COBOCE
              </Typography>
            </Box>
            <Stack direction="row" gap={1} alignItems="center">
              <Button variant="outlined" color="primary">
                Exportar
              </Button>
              <Button variant="contained" color="primary">
                Nueva Tarea
              </Button>
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
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
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

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Avatar
              sx={{ mx: 'auto', mb: collapsed ? 0 : 1 }}
              src="https://i.pravatar.cc/100?img=13"
            />
            {!collapsed && (
              <>
                <Typography fontWeight={700}>Andrés Erick</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingeniero de Sistemas
                </Typography>
              </>
            )}
          </Box>
        </Drawer>

        {/* Contenido principal: tablero de ejemplo */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />

          <Stack direction={{ xs: 'column', md: 'row' }} gap={2} mb={2}>
            <StatCard title="Ingreso de Ventas" value="Bs 1.28M" trend={6.4} />
            <StatCard title="Órdenes Completadas" value="4,312" trend={2.1} />
            <StatCard title="Índice de Cumplimiento" value="92%" trend={-1.2} />
          </Stack>

          <Stack direction={{ xs: 'column', lg: 'row' }} gap={2}>
            <Box sx={{ flex: 2 }}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Tendencia de Producción
                </Typography>
                <MiniArea />
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Tareas Recientes
                </Typography>
                <SimpleTable />
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Acciones rápidas
                </Typography>
                <Stack gap={1}>
                  <Button variant="contained" color="primary">
                    Crear Indicador
                  </Button>
                  <Button variant="outlined" color="primary">
                    Cargar Reporte
                  </Button>
                  <Button variant="text" color="primary">
                    Ver Políticas
                  </Button>
                </Stack>
              </Paper>
            </Box>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
