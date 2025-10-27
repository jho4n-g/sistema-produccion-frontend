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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';

const DEFECTOSSELECT = [
  { code: 1, label: 'Aire goteado' },
  { code: 2, label: 'Burbujas' },
  { code: 3, label: 'Serigrafía mala' },
  { code: 4, label: 'Grietas' },
];

const formInitial = () => ({
  fecha: '',
  producto: '',
  horno: '',
  formato: '',
  turno: '',
  supervisor_turno: '',
  grupo: '',
  obervacion: '',
});

export default function ControlSeleccionEmbalaje() {
  const [defecto, setDefecto] = useState('');

  const handleChangeDefecto = (event) => {
    setDefecto(event.target.value);
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
                CONTROL DE PROCESO - SELECCION Y EMBALAJE
              </Typography>
            </Stack>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Grid container spacing={2}>
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
                  label="Horno"
                  type="label"
                  name="horno"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Formato"
                  type="label"
                  name="horno"
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
                  label="Grupo #"
                  type="label"
                  name="grupo"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Observacion"
                  type="label"
                  name="observacion"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 1 }}>
                <Button variant="contained">
                  <AddIcon />
                </Button>
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
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
                minWidth: 3000,
                tableLayout: { xs: 'auto', md: 'fixed' },
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
              <TableHead sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    rowSpan={2}
                    align="center"
                    className="groupTitle"
                  >
                    Hora
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={13}
                    align="center"
                    className="groupTitle"
                  >
                    PRIMERA (CAJA) TONO - CALIBRE
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    className="groupTitle"
                  >
                    Segunda
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={10}
                    align="center"
                    className="groupTitle"
                  >
                    DEFECTOS (PIEZAS)
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    className="groupTitle"
                  >
                    Tercera
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={7}
                    align="center"
                    className="groupTitle"
                  >
                    DEFECTOS (PIEZAS)
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    className="groupTitle"
                  >
                    Casco
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={4}
                    align="center"
                    className="groupTitle"
                  >
                    DEFECTOS (PIEZAS)
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                    className="groupTitle"
                  >
                    ESPACIO
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    A3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    B3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    c1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    C2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    C3
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    D1
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    D2
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    D3
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
                    cajas
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-label">
                        Defecto
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={defecto}
                        label="Age"
                        onChange={handleChangeDefecto}
                      >
                        <MenuItem value={10}>3</MenuItem>
                        <MenuItem value={20}>4</MenuItem>
                        <MenuItem value={30}>serigrafia mala</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-label">
                        Defecto
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={{}}
                        label="Age"
                        onChange={{}}
                      >
                        <MenuItem value={10}>Aire</MenuItem>
                        <MenuItem value={20}>Goteado</MenuItem>
                        <MenuItem value={30}>serigrafia mala</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                      <InputLabel id="defecto-label">Defecto</InputLabel>
                      <Select
                        labelId="defecto-label"
                        value={defecto}
                        label="Defecto"
                        onChange={handleChangeDefecto}
                      >
                        {DEFECTOSSELECT.map((d) => (
                          <MenuItem key={d.code} value={d.code}>
                            {d.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell component="th" className="groupTitle">
                    CAJAS
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell className="groupTitle">Cajas</TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell
                    component="th"
                    colSpan={1}
                    align="center"
                    className="groupTitle"
                  >
                    <TextField size="small" />
                  </TableCell>
                  <TableCell className="groupTitle">(Min.)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" />
                  </TableCell>
                  <TableCell>
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
