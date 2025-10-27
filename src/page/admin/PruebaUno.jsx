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
} from '@mui/material';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
          color: 'text.primary',
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

function StatCard({ title, value, trend = 0 }) {
  const up = trend >= 0;
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, borderRadius: 2, borderColor: alpha(coboceGreen, 0.25) }}
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
                bgcolor: alpha(coboceGreen, 0.1),
                color: coboceGreen,
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
            bgcolor: alpha(coboceGreen, 0.08),
          }}
        />
      </Stack>
      <Box mt={2}>
        <LinearProgress
          color="primary"
          variant="determinate"
          value={Math.min(100, Math.max(0, 50 + trend))}
        />
      </Box>
    </Paper>
  );
}

export default function AppBarOverSidebar() {
  const [collapsed, setCollapsed] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: { main: coboceGreen },
          background: { default: '#ffffff', paper: '#ffffff' },
          text: { primary: '#000000ff' },
        },
        shape: { borderRadius: 10 },
        typography: {
          fontFamily:
            'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial',
        },
      }),
    []
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
        {/* AppBar */}
        <AppBar
          position="fixed"
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
          </Toolbar>
        </AppBar>

        {/* Sidebar en blanco */}
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : expandedWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: collapsed ? collapsedWidth : expandedWidth,
              transition: 'width 0.3s',
              overflowX: 'hidden',
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderRight: (t) =>
                `1px solid ${alpha(t.palette.text.primary, 0.1)}`,
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
              sx={{
                mx: 'auto',
                mb: collapsed ? 0 : 1,
                bgcolor: coboceGreen,
                color: '#ffffff',
              }}
            >
              AE
            </Avatar>
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

        {/* Contenido principal */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Stack direction={{ xs: 'column', md: 'row' }} gap={2} mb={2}>
            <StatCard title="Ingreso de Ventas" value="Bs 1.28M" trend={6.4} />
            <StatCard title="Órdenes Completadas" value="4,312" trend={2.1} />
            <StatCard title="Índice de Cumplimiento" value="92%" trend={-1.2} />
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
