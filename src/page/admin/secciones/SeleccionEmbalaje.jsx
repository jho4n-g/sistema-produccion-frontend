import {
  Box,
  Paper,
  Stack,
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SeleccionEmbalajeModal from '../../../components/modales/SeleccionEmbalajeModal';
import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  getObj,
  getIdObj,
  UpdateIdObj,
} from '../../../service/SeccionesProduccion/SeleccionEmbalaje';
import { toast } from 'react-toastify';
import { normalize } from '../../../lib/convert';
import LoadingScreen from '../../../components/general/LoadingScreen';

export default function SeleccionEmbalaje() {
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  //tabla
  const [row, setRow] = useState([]);
  const [loading, setLoading] = useState(false);

  // paginado (cliente)
  const [page, setPage] = useState(0); // 0-based
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const obj = await getObj();
      setRow(Array.isArray(obj?.datos) ? obj.datos : []);
    } catch (e) {
      toast.error(e.message || 'Error al cargar lo datos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);
  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return row;
    return row.filter((r) => {
      // Busca en columnas simples
      const matchSimple = [
        'fecha',
        'hora_inicio',
        'hora_final',
        'turno',
        'operador',
        'supervisor_turno',
      ].some((k) => normalize(r?.[k]).includes(q));

      // Busca dentro de las observaciones anidadas
      const matchObs = r.observacion_embalaje?.some((o) =>
        normalize(o?.observacion).includes(q)
      );

      return matchSimple || matchObs;
    });
  }, [row, query]);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const handleChangePage = (_evt, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (evt) => {
    setRowsPerPage(parseInt(evt.target.value, 10));
    setPage(0);
  };
  const handleEditClick = (id) => {
    console.log('edit ', id);
    setSelectedId(id);
    setIsEdit(true);
    setOpenModal(true);
  };

  const handleViewClick = (id) => {
    console.log(id);
    setSelectedId(id);
    setIsEdit(false);
    setOpenModal(true);
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
            Control de Procesos - Seleccion y Embalaje
          </Typography>
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
                  <TableCell>PRODUCTO </TableCell>
                  <TableCell>HORNO</TableCell>
                  <TableCell>FORMATO</TableCell>
                  <TableCell>GRUPO</TableCell>
                  <TableCell colSpan={2}>OBSERVACIONES</TableCell>
                  <TableCell>ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <LoadingScreen />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {paginated.map((r, idx) => (
                      <TableRow key={r.id ?? idx}>
                        <TableCell align="center">
                          {page * rowsPerPage + idx + 1}
                        </TableCell>
                        <TableCell align="center" sx={{ width: 130 }}>
                          {r.fecha}
                        </TableCell>
                        <TableCell align="center">{r.turno}</TableCell>
                        <TableCell colSpan={2}>{r.operador}</TableCell>
                        <TableCell>{r.producto}</TableCell>
                        <TableCell>{r.horno}</TableCell>
                        <TableCell>{r.formato}</TableCell>
                        <TableCell>{r.grupo}</TableCell>
                        <TableCell colSpan={2}>
                          {r.observacion_embalaje?.length
                            ? r.observacion_embalaje
                                .map((obs) => obs?.observacion)
                                .filter(Boolean)
                                .join(', ')
                            : '—'}
                        </TableCell>
                        <TableCell>
                          <Stack spacing={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleViewClick(r.id)}
                            >
                              Detalles
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleEditClick(r.id)}
                            >
                              Editar
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}

                    {paginated.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={11}
                          sx={{ color: '#777', textAlign: 'center' }}
                        >
                          Sin resultados
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filtered.length} // total después del filtro
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
      <SeleccionEmbalajeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        fetchById={getIdObj}
        updatedById={UpdateIdObj}
        id={selectedId}
        isEditing={isEdit}
        onSave={reload}
      />
    </>
  );
}
