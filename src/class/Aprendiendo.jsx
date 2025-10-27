import * as React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Box,
} from '@mui/material';

export default function TablaMolienda() {
  return (
    <Box sx={{ width: '100%', display: 'grid', gap: 2 }}>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          overflowX: 'hidden',
          borderRadius: 2,
          boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e5e7eb',
        }}
      >
        <Table
          stickyHeader
          sx={{
            tableLayout: 'fixed',
            width: '100%',
            borderCollapse: 'collapse',
            '& td, & th': { border: '1px solid #D1D5DB' }, // gris tenue
            '& .MuiTableCell-root': {
              p: 0.75,
              fontSize: 12,
              whiteSpace: 'nowrap',
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
            '& tbody tr:hover': {
              backgroundColor: '#F0F9FF',
            },
            '& .MuiInputBase-input': {
              p: '6px 8px',
              textAlign: 'center',
              fontSize: 12,
            },
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
              fontSize: 13,
              letterSpacing: 0.2,
            },
          }}
        >
          <TableHead sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}>
            {/* Título superior: Cargado / Descargando */}
            <TableRow>
              <TableCell
                component="th"
                colSpan={12}
                align="center"
                className="groupTitle"
              >
                Cargado Molino
              </TableCell>
              <TableCell
                component="th"
                colSpan={5}
                align="center"
                className="groupTitle"
              >
                Descargando Molino
              </TableCell>
            </TableRow>

            {/* Fila principal de encabezados */}
            <TableRow>
              <TableCell
                component="th"
                rowSpan={3}
                align="center"
                sx={{ minWidth: 56 }}
                className="stickyCol"
              >
                N°
              </TableCell>
              <TableCell
                component="th"
                rowSpan={3}
                align="center"
                sx={{ minWidth: 100 }}
                title="Hora de inicio de la molienda"
              >
                Hora Inicio
              </TableCell>
              <TableCell
                component="th"
                rowSpan={3}
                align="center"
                sx={{ minWidth: 100 }}
                title="Hora de finalización de la molienda"
              >
                Hora Fin
              </TableCell>

              {/* Tres grupos con subcolumnas (Lugar1/2/3) */}
              <TableCell component="th" align="center" colSpan={2}>
                <TextField
                  size="small"
                  label="Lugar 1"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell component="th" align="center" colSpan={2}>
                <TextField
                  size="small"
                  label="Lugar 2"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell component="th" align="center" colSpan={2}>
                <TextField
                  size="small"
                  label="Lugar 3"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>

              {/* Columnas verticales a la derecha */}
              <TableCell
                component="th"
                align="center"
                rowSpan={2}
                sx={{ minWidth: 80 }}
              >
                H₂O
              </TableCell>
              <TableCell component="th" align="center">
                REOMA
              </TableCell>
              <TableCell
                component="th"
                align="center"
                rowSpan={2}
                sx={{ minWidth: 80 }}
              >
                REOMA
              </TableCell>
              <TableCell
                component="th"
                align="center"
                rowSpan={2}
                sx={{ minWidth: 70 }}
              >
                Dens
              </TableCell>
              <TableCell
                component="th"
                align="center"
                rowSpan={2}
                sx={{ minWidth: 70 }}
              >
                Visc
              </TableCell>
              <TableCell
                component="th"
                align="center"
                rowSpan={2}
                sx={{ minWidth: 70 }}
              >
                Res
              </TableCell>
              <TableCell
                component="th"
                align="center"
                rowSpan={2}
                sx={{ minWidth: 70 }}
              >
                Fosa
              </TableCell>
              <TableCell
                component="th"
                align="center"
                rowSpan={3}
                sx={{ minWidth: 120 }}
              >
                Producto
              </TableCell>
            </TableRow>

            {/* Subfila con Hum% + campo (solo en header) */}
            <TableRow>
              <TableCell align="center">Hum %</TableCell>
              <TableCell align="center">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="%"
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell align="center">Hum %</TableCell>
              <TableCell align="center">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="%"
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell align="center">Hum %</TableCell>
              <TableCell align="center">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="%"
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>

              {/* Bajo el REOMA del medio */}
              <TableCell align="center">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Proveedor / Nota"
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
            </TableRow>

            {/* Subfila inferior con TN/Litros/Kg y métricas de descarga */}
            <TableRow>
              <TableCell align="center" colSpan={2}>
                TN
              </TableCell>
              <TableCell align="center" colSpan={2}>
                TN
              </TableCell>
              <TableCell align="center" colSpan={2}>
                TN
              </TableCell>
              <TableCell align="center">Litros</TableCell>
              <TableCell align="center">Kg</TableCell>
              <TableCell align="center">Kg</TableCell>
              <TableCell align="center">g/ml</TableCell>
              <TableCell align="center">s</TableCell>
              <TableCell align="center">%</TableCell>
              <TableCell align="center">N</TableCell>
            </TableRow>
          </TableHead>

          {/* Cuerpo (17 columnas) */}
          <TableBody>
            <TableRow>
              {/* 1: N° */}
              <TableCell align="center" className="stickyCol">
                1
              </TableCell>

              {/* 2: Hora Inicio */}
              <TableCell align="center">
                <TextField type="time" size="small" />
              </TableCell>

              {/* 3: Hora Fin */}
              <TableCell align="center">
                <TextField type="time" size="small" />
              </TableCell>

              {/* 4-5: Lugar 1 */}
              <TableCell align="center" colSpan={2}>
                <TextField size="small" placeholder="TN" />
              </TableCell>

              {/* 6-7: Lugar 2 */}
              <TableCell align="center" colSpan={2}>
                <TextField size="small" placeholder="TN" />
              </TableCell>

              {/* 8-9: Lugar 3 */}
              <TableCell align="center" colSpan={2}>
                <TextField size="small" placeholder="TN" />
              </TableCell>

              {/* 10: H₂O (Litros) */}
              <TableCell align="center">
                <TextField size="small" placeholder="L" />
              </TableCell>

              {/* 11: REOMA (Kg) – central */}
              <TableCell align="center">
                <TextField size="small" placeholder="Kg" />
              </TableCell>

              {/* 12: REOMA (Kg) – última */}
              <TableCell align="center">
                <TextField size="small" placeholder="Kg" />
              </TableCell>

              {/* 13: Dens */}
              <TableCell align="center">
                <TextField t size="small" placeholder="g/ml" />
              </TableCell>

              {/* 14: Visc */}
              <TableCell align="center">
                <TextField size="small" placeholder="s" />
              </TableCell>

              {/* 15: Res */}
              <TableCell align="center">
                <TextField size="small" placeholder="%" />
              </TableCell>

              {/* 16: Fosa */}
              <TableCell align="center">
                <TextField size="small" placeholder="N" />
              </TableCell>

              {/* 17: Producto */}
              <TableCell align="center">
                <TextField size="small" placeholder="Producto" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
