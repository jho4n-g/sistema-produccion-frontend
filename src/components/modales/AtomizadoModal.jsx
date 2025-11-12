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

export default function AtomizadoModal({ open, onClose }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xl  ">
      <DialogTitle>
        Detalles de Control de Procesos - Moliendo barbotina
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
                  width={90}
                  align="center"
                  className="groupTitle"
                >
                  Hora
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  PB1
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  PA1
                </TableCell>
                <TableCell
                  component="th"
                  rowSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  PB2
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  PA2
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  PB3
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  PA3
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  TE
                </TableCell>
                <TableCell
                  component="th"
                  rowSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  TS
                </TableCell>

                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  LANZ
                </TableCell>
                <TableCell
                  component="th"
                  rowSpan={3}
                  align="center"
                  className="groupTitle"
                >
                  HUMEDAD
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  SILO
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  rowSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  PRODUCTO
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  rowSpan={2}
                  align="center"
                  className="groupTitle"
                  sx={{
                    width: 100, // px o %
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                >
                  N° <br />
                  SILO LLENOS
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  Bareas
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  Bareas
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  Bareas
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  Bareas
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  Bareas
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  Bareas
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={2}
                  align="center"
                  className="groupTitle"
                >
                  °C
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  °C
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  °C
                </TableCell>
                <TableCell
                  component="th"
                  colSpan={1}
                  align="center"
                  className="groupTitle"
                >
                  Descarga
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                '& .MuiTableCell-root': {
                  fontSize: '13px',
                  padding: '12px 16px',
                },
              }}
            >
              <TableRow>
                <TableCell>10:10 </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:10 </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:10 </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:10 </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:10 </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:10 </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:10 </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10:10 </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ mr: 2, mb: 4 }} />
        <Stack direction="row">
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
                '& tbody tr:nth-of-type(odd)': { backgroundColor: '#FAFAFA' },
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
                    colSpan={5}
                    align="center"
                    className="groupTitle"
                  >
                    CONTROL GRANULOMETRIA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="groupTitle">hola</TableCell>

                  <TableCell align="center">
                    <TextField size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
                '& tbody tr:nth-of-type(odd)': { backgroundColor: '#FAFAFA' },
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
                    colSpan={4}
                    align="center"
                    className="groupTitle"
                  >
                    CONTROL FOSAS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" className="groupTitle">
                    1
                  </TableCell>

                  <TableCell align="center">
                    <TextField size="small" inputProps={{ step: '0.01' }} />
                  </TableCell>

                  <TableCell align="center">
                    <TextField size="small" inputProps={{ step: '0.01' }} />
                  </TableCell>

                  <TableCell align="center">
                    <TextField size="small" inputProps={{ step: '0.01' }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          startIcon={<CircularProgress size={16} color="inherit" />}
        >
          Guardas Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
