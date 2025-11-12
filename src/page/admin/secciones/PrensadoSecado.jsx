import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Typography,
  Grid,
  TextField,
  TablePagination,
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PrensadoSecadoModal from '../../../components/modales/PrensadoSecadoModal';
export default function PrensadoSecado() {
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  // paginado (cliente)
  const [page, setPage] = useState(0); // 0-based
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_evt, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (evt) => {
    setRowsPerPage(parseInt(evt.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Stack spacing={3}>
        <Box
          sx={{
            display: 'flex', // activa el layout en fila
            alignItems: 'center', // centra verticalmente
            justifyContent: 'space-between', // deja espacio entre título y botón
            p: 2, // padding interno
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            Control de Procesos - Prensado y Secado
          </Typography>

          <Button variant="contained" color="primary">
            Buscar
          </Button>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid size={4}>
              <TextField
                size="small"
                fullWidth
                placeholder="Buscar por Nombre..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                  ),
                  endAdornment: query ? (
                    <IconButton size="small" onClick={() => setQuery('')}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ) : null,
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper>
          <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
            <Table
              stickyHeader
              aria-label="tabla kpi"
              sx={{
                minWidth: 900,
                borderCollapse: 'separate',
                borderSpacing: 0,
                '& th, & td': {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  fontVariantNumeric: 'tabular-nums',
                },
                '& th:not(:last-of-type), & td:not(:last-of-type)': {
                  borderRight: '1px solid',
                  borderColor: 'divider',
                },
                '& thead th': { fontWeight: 600, bgcolor: 'background.paper' },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">N°</TableCell>
                  <TableCell align="center">FECHA</TableCell>
                  <TableCell align="center">TURNO</TableCell>
                  <TableCell colSpan={2}>OPERADOR</TableCell>
                  <TableCell>N° PRENSA</TableCell>
                  <TableCell>FORMATO</TableCell>
                  <TableCell>PRODUCTO </TableCell>
                  <TableCell colSpan={2}>OBSERVACIONES</TableCell>
                  <TableCell>ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody hover sx={{ bgcolor: 'white' }}>
                {/* Ejemplo: ahora el body debe tener 13 celdas (columnas finales) */}
                <TableRow hover>
                  <TableCell>1</TableCell>
                  <TableCell>2025-05-20</TableCell>
                  <TableCell>Mañana</TableCell>

                  {/* OPERADOR ocupa 2 */}
                  <TableCell colSpan={2}>
                    Jhoan Sebastian Gutierrez Velsco
                  </TableCell>

                  {/* EQUIPO ocupa 2 */}
                  <TableCell>EQ-001</TableCell>

                  <TableCell>1200</TableCell>
                  <TableCell>1220</TableCell>

                  {/* OBSERVACIONES ocupa 2 */}
                  <TableCell colSpan={2}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolores perspiciatis, quidem ipsum recusandae nihil ut
                      cumque repellat totam nulla! Incidunt sequi quod beatae
                      maiores, fuga voluptate cum molestias. Inventore, quae?
                    </p>
                  </TableCell>

                  <TableCell>
                    <Stack direction="column" spacing={1}>
                      <Button
                        variant="outlined"
                        onClick={() => setOpenModal(true)}
                      >
                        Detalles
                      </Button>
                      <Button variant="contained">Editar</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={{}} // total después del filtro
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              labelRowsPerPage="Filas por página"
            />
          </TableContainer>
        </Paper>
      </Stack>
      <PrensadoSecadoModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
