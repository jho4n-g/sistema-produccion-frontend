import React, { useState } from 'react';
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

const ControlPS = () => ({
  fecha: '',
  n_prensa: '',
  turno: '',
  formato: '',
  supervisor_turno: '',
  prodcuto: '',
  operador: '',
  observacion: '',
});

export default function ControlPrensadoSecado() {
  const [form, setFrom] = useState(ControlPS);

  const hadleInputChange = (event) => {
    const { name, value } = event.target;
    setFrom({
      ...form,
      [name]: value,
    });
  };
  const habldeSumit = () => {
    console.log(form);
  };
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
                CONTROL DE PROCESO - PRENSADO Y SECADO
              </Typography>
            </Stack>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  fullWidth
                  value={form.fecha}
                  size="small"
                  label="Fecha"
                  type="date"
                  name="fecha"
                  InputLabelProps={{ shrink: true }}
                  onChange={hadleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 7 }}></Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  value={form.n_prensa}
                  size="small"
                  label="N° Prensa"
                  type="label"
                  name="n_prensa"
                  onChange={hadleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  valu={form.turno}
                  size="small"
                  label="Turno"
                  type="label"
                  name="turno"
                  onChange={hadleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 1 }}>
                <TextField
                  fullWidth
                  value={form.formato}
                  size="small"
                  label="Formato"
                  type="label"
                  name="formato"
                  onChange={hadleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  value={form.supervisor_turno}
                  size="small"
                  label="Supervisor de Turno"
                  type="label"
                  name="supervisor_turno"
                  onChange={hadleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  value={form.producto}
                  size="small"
                  label="producto"
                  type="label"
                  name="producto"
                  onChange={hadleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  value={form.operador}
                  size="small"
                  label="Operador"
                  type="label"
                  name="operador"
                  onChange={hadleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <TextField
                  fullWidth
                  value={form.observacion}
                  size="small"
                  label="Observacion"
                  type="label"
                  name="observacion"
                  onChange={hadleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 1 }}>
                <Button variant="contained">
                  <AddIcon />
                </Button>
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <Button
                  variant="contained"
                  onClick={habldeSumit}
                  startIcon={<UploadIcon />}
                >
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
                minWidth: 1600,
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
                    style={{ width: 80 }}
                  >
                    Hora
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    rowSpan={3}
                    align="center"
                    className="groupTitle"
                    style={{ width: 80 }}
                  >
                    % <br /> Humo <br /> Polvo
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={7}
                    rowSpan={2}
                    align="center"
                    className="groupTitle"
                    style={{ width: 500 }}
                  >
                    MASA POR MOLDE KG
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={10}
                    rowSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 600 }}
                  >
                    ESPESOR POR MOLDE MM
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={7}
                    rowSpan={1}
                    align="center"
                    className="groupTitle"
                    style={{ width: 450 }}
                  >
                    GRANULOMETRIA
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    molde <br />1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    molde <br />2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    molde <br />3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    molde <br />4
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    molde <br />5
                  </TableCell>

                  <TableCell
                    component="th"
                    colSpan={7}
                    align="center"
                    className="groupTitle"
                  >
                    mallas
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    4
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    5
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    6
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    7
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B
                  </TableCell>

                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B
                  </TableCell>

                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    35
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    40
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    50
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    70
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    100
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    120
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    Fon.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small"></TextField>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 6 }}>
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
                    <TableHead
                      sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}
                    >
                      <TableRow>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          PRESION ESPECIFICA (kg/cm2)
                        </TableCell>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          <TextField size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          GOLPES INICIAL
                        </TableCell>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          <TextField size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          GOLPES FINAL
                        </TableCell>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          <TextField size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          TOTAL GOLPES TURNO
                        </TableCell>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          <TextField size="small" />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid size={{ xs: 6, md: 6 }}>
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
                    <TableHead
                      sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}
                    >
                      <TableRow>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          SILOS USADOS
                        </TableCell>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          <TextField size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          % HUMEDAD
                        </TableCell>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          <TextField size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          SILOS USADOS
                        </TableCell>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          <TextField size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          % HUMEDAD
                        </TableCell>
                        <TableCell
                          component="th"
                          colSpan={3}
                          align="center"
                          className="groupTitle"
                        >
                          <TextField size="small" />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Paper>
    </Box>
  );
}
