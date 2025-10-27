import React from 'react';
import {
  Container,
  Paper,
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';

export default function ControlLineaEsmaltacion() {
  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Paper>
        <Container
          maxWidth="xl"
          sx={{ py: { xs: 2, md: 3 }, minHeight: 'calc(100vh - 32px)' }}
        >
          <Paper
            variant="outlined"
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 2,
              px: 2,
              py: 1.5,
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1 }}>
                CONTROL DE LA LIENA DE ESMALTACION
              </Typography>
            </Stack>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Grid container spacing={1}>
              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Fecha"
                  type="date"
                  name="fecha"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Producto"
                  type="label"
                  name="producto"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Linea"
                  type="label"
                  name="linea"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Turno"
                  type="label"
                  name="turno"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Supervisor de Turno"
                  type="label"
                  name="supervisor_turno"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Aplicaciones Serigraficas "
                  type="label"
                  name="supervisor_turno"
                />
              </Grid>
              <Grid size={{ xs: 8, md: 1 }}>
                <Button variant="contained">
                  <AddIcon />
                </Button>
              </Grid>
              <Grid size={{ sx: 6, md: 2 }}>
                <Button variant="contained" startIcon={<UploadIcon />}>
                  Registrar Datos
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            sx={{ mb: 1 }}
          >
            <Button size="small" variant="contained" startIcon={<AddIcon />}>
              Agregar fila
            </Button>
            <Button size="small" variant="contained" startIcon={<DeleteIcon />}>
              Quitar fila
            </Button>
          </Stack>
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
              overflowX: 'auto',
              borderRadius: 2,
              boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
              mb: 5,
            }}
          >
            <Table
              stickyHeader
              sx={{
                tableLayout: 'fixed',
                width: '100%',
                minWidth: 1800,
                borderCollapse: 'collapse',
                '& td, & th': { border: '1px solid #D1D5DB' },
                '& .MuiTableCell-root': {
                  p: { xs: 0.5, md: 0.75 },
                  fontSize: { xs: 11, md: 12 },
                  whiteSpace: { xs: 'normal', md: 'nowrap' },
                },
                '& thead th': {
                  background:
                    'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%) !important',
                  textTransform: 'uppercase',
                  letterSpacing: 0.4,
                },
                '& tbody tr:nth-of-type(odd)': {
                  backgroundColor: '#FAFAFA',
                },
                '& tbody tr:hover': { backgroundColor: '#F0F9FF' },
                '& tbody td.stickyCol, & thead th.stickyCol': {
                  position: 'sticky',
                  left: 0,
                  zIndex: 2,
                  backgroundColor: '#fff',
                  boxShadow: 'inset -1px 0 0 #D1D5DB',
                },
                '& thead th.stickyCol': { zIndex: 3 },
                '& .groupTitle': {
                  fontWeight: 800,
                  fontSize: { xs: 12, md: 13 },
                  letterSpacing: 0.2,
                },
              }}
            >
              <TableHead sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    rowSpan={3}
                    align="center"
                    className="groupTitle"
                    style={{ width: 90 }}
                  >
                    Hora
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    <TextField
                      size="small"
                      label="Agua"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    engobe
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    <TextField
                      size="small"
                      label="Normal"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    <TextField
                      size="small"
                      label="Recuperado"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    <TextField
                      size="small"
                      label="Implemeable"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    rowSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 180 }}
                  >
                    esmalte
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 110 }}
                  >
                    <TextField
                      size="small"
                      label="Brillante"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      label="Recuperando"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      label="Transparente"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      label="Satinado"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField
                      size="small"
                      label="Digital"
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 130 }}
                  >
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    aplicacion[g]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    aplicacion[g]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    viscocidad[s]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    densidad[g/CM³]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    residuo[%]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    aplicacion[g]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    aplicacion[g]
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    Residuo[%]
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Operador
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Sup. Prod.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" type="time" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" type="time" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" type="time" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" type="time" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" colSpan={1} align="center">
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Paper>
    </Box>
  );
}
