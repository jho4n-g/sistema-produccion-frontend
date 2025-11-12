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
import IconButton from '@mui/material/IconButton';

import ModalMoliendoBarbotina from '../../../components/modales/MoliendoBarbotinaMolda';
import LoadingScreen from '../../../components/general/LoadingScreen';
import {
  getObj,
  getIdObj,
  UpdateIdObj,
} from '../../../service/SeccionesProduccion/Barbotina';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo } from 'react';
import { normalize } from '../../../lib/convert';

export default function MoliendoBarbotina() {
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [row, setRow] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  // paginado (cliente)
  const [page, setPage] = useState(0); // 0-based
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        'turno',
        'operador',
        'equipo',
        'horometro_final',
        'horometro_inicio',
      ].some((k) => normalize(r?.[k]).includes(q));

      // Busca dentro de las observaciones anidadas
      const matchObs = r.ObservacionesBarbotinaDatos?.some((o) =>
        normalize(o?.observacion).includes(q)
      );

      return matchSimple || matchObs;
    });
  }, [row, query]);

  // slice de paginado en cliente
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
    setSelectedId(id);
    setIsEdit(true);
    setOpenModal(true);
  };

  const handleViewClick = (id) => {
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
            Control de Procesos - Moliendo barbotina
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
                  <TableCell align="center" sx={{ width: 130 }}>
                    FECHA
                  </TableCell>
                  <TableCell align="center">TURNO</TableCell>
                  <TableCell colSpan={2}>OPERADOR</TableCell>
                  <TableCell sx={{ width: 100 }}>EQUIPO</TableCell>
                  <TableCell sx={{ width: 100 }}>HOROMETRO INICIO</TableCell>
                  <TableCell sx={{ width: 100 }}>HOROMETRO FINAL</TableCell>
                  <TableCell colSpan={2}>OBSERVACIONES</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>ACCIONES</TableCell>
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
                        <TableCell sx={{ width: 100 }}>{r.equipo}</TableCell>
                        <TableCell sx={{ width: 100 }}>
                          {r.horometro_inicio}
                        </TableCell>
                        <TableCell sx={{ width: 100 }}>
                          {r.horometro_final}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {r.ObservacionesBarbotinaDatos?.length
                            ? r.ObservacionesBarbotinaDatos.map(
                                (obs) => obs?.observacion
                              )
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
            {/* Paginación */}
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
      <ModalMoliendoBarbotina
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
