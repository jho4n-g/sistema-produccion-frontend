import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Divider,
  Stack,
  TableBody,
  TableContainer,
} from '@mui/material';

export default function SerigraficaDecoradodoModal({ open, onClose }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xl  ">
      <DialogTitle>
        Detalles de Control de Procesos - Serigrafica y Decorado
      </DialogTitle>
      <DialogContent>
        <TableContainer
          component={Paper}
          sx={{
            width: '100%',
            overflowX: 'auto',
            borderRadius: 2,
            boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
            mb: 3,
          }}
        >
          <Table
            stickyHeader
            sx={{
              tableLayout: { xs: 'auto', md: 'fixed' },
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
                  style={{ width: 90 }}
                  align="center"
                  className="groupTitle"
                >
                  Hora
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={6}
                  align="center"
                  className="groupTitle"
                  style={{ width: 550 }}
                >
                  <TextField size="small" label="Pasta :1" name="pasta1" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={6}
                  align="center"
                  className="groupTitle"
                  style={{ width: 550 }}
                >
                  <TextField size="small" label="Pasta :2" name="pasta2" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={6}
                  align="center"
                  className="groupTitle"
                  style={{ width: 550 }}
                >
                  <TextField size="small" label="Pasta :3" name="pasta3" />
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={6}
                  align="center"
                  className="groupTitle"
                  style={{ width: 550 }}
                >
                  <TextField size="small" label="Pasta :4" name="pasta4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  APL [G]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  V [s]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  D [g/cm³]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  APL [G]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  V [s]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  D [g/cm³]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  APL [G]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  V [s]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  D [g/cm³]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  APL [G]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  V [s]
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  D [g/cm³]
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
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
                  S.P.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField type="time" size="small" />
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained">Guardas Cambios </Button>
      </DialogActions>
    </Dialog>
  );
}
