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
import { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { normalize } from '../../../lib/convert';
import LoadingScreen from '../../../components/general/LoadingScreen';
import { getUsers, getRoles } from '../../../service/user-admin/User';
import UserModal from '../../../components/user-admin/UserModal';

export default function UserPage() {
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  //tabla
  const [row, setRow] = useState([]);
  const [loading, setLoading] = useState(false);
  // paginado (cliente)
  const [page, setPage] = useState(0); // 0-based
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const obj = await getUsers();
      if (obj.ok) {
        setRow(Array.isArray(obj?.users) ? obj.users : []);
      } else {
        toast.error('Error al cargar lo datos ok');
      }
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
      const matchSimple = ['username'].some((k) =>
        normalize(r?.[k]).includes(q)
      );

      // Busca dentro de las observaciones anidadas
      const matchObs = r.roles?.some((o) => normalize(o?.name).includes(q));

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
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsEdit(true);
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
            Gestion de Usuarios
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
            <Grid size={6}></Grid>
            <Grid size={2}>
              <Button variant="contained" onClick={() => setOpenModal(true)}>
                Crear Nuevo Usuario
              </Button>
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
                  <TableCell align="center">USERNAME</TableCell>
                  <TableCell align="center">ROLES</TableCell>
                  <TableCell align="center">ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell>
                      <LoadingScreen />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {paginated.map((r, idx) => (
                      <TableRow key={r.id}>
                        <TableCell align="center">
                          {page * rowsPerPage + idx + 1}
                        </TableCell>
                        <TableCell align="center">{r.username}</TableCell>
                        <TableCell align="center">
                          {r.roles?.map((role) => role.name).join(', ')}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleEditClick(r)}
                            sx={{ mr: 1 }}
                          >
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    {paginated.length === 0 && (
                      <TableRow>
                        <TableCell sx={{ color: '#777', textAlign: 'center' }}>
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
      <UserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        isEdit={isEdit}
        selectedUser={selectedRow}
        onSave={reload}
        fetchRoles={getRoles}
      />
    </>
  );
}
