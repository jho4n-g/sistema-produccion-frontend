import { z } from 'zod';

import {
  reqNum,
  reqPct,
  reqStr,
  reqFloat,
  optNum,
  reqTime,
  optStr,
} from '../../lib/convert.js';

const TablaDatosBarbotina = z.object({
  n_molino_cargando_molinos: reqNum('Numero molino'),
  hora_inicio: reqTime('Hola inicial'),
  hora_final: reqTime('Hola final'),
  tn_lugar_uno_cargando_molinos: reqFloat('Tonelada lugar Uno'),
  tn_lugar_dos_cargando_molinos: reqFloat('Tonelada lugar dos'),
  tn_lugar_tres_cargando_molinos: reqFloat('Tonelada lugar tres'),
  tn_lugar_cuantro_cargando_molinos: optNum('Tonelada lugar cuantro'),
  h2o_cargando_molinos: reqFloat('H20'),
  deflo_cargando_molinos: reqFloat('Deflo'),
  reoma_cargando_molinos: optNum('Reoma'),
  dens_descargando_molinos: reqFloat('Dens'),
  visc_descargando_molinos: reqFloat('Visc'),
  res_descargando_molinos: reqFloat('Res'),
  n_fosa_descargando_molinos: reqStr('Fosa'),
  producto_descargando_molinos: reqStr('Producto'),
});

const DatosObservacionesBarbotina = z.object({
  observacion: reqStr('Obervaciones Barbotina'),
});
export const registerBarbotina = z
  .object({
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato AAAA-MM-DD'),
    turno: reqStr('Turno'),
    operador: reqStr('Operador'),
    supervisor_turno: reqStr('Superviso Turno'),
    equipo: reqStr('Equipo'),
    horometro_inicio: reqNum('Horometro inicio'),
    horometro_final: reqNum('Hormetro final'),
    nombre_lugar_uno_cargando_molinos: reqStr('Nombre lugar uno'),
    humedad_lugar_uno_cargando_molinos: reqPct('Humedad lugar uno'),
    nombre_lugar_dos_cargando_molinos: reqStr('Nombre lugar dos'),
    humedad_lugar_dos_cargando_molinos: reqPct('Humedad dos uno'),
    nombre_lugar_tres_cargando_molinos: reqStr('Nombre lugar tres'),
    humedad_lugar_tres_cargando_molinos: reqPct('Humedad lugar tres'),
    nombre_lugar_cuarto_cargando_molinos: optStr('Nombre lugar cuatro'),
    humedad_lugar_cuarto_cargando_molinos: optStr('Humedad lugar cuatro'),
    deflo_proveerdo_cargando_molinos: reqStr('Deflo'),
    TablaBarbotinaDatos: z
      .array(TablaDatosBarbotina)
      .min(0)
      .max(15)
      .default([]),
    ObservacionesBarbotinaDatos: z
      .array(DatosObservacionesBarbotina)
      .default([]),
  })
  .superRefine((d, ctx) => {
    if (d.horometro_final < d.horometro_inicio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['horometro_final'],
        message:
          'El horómetro final debe ser mayor o igual al horómetro inicial',
      });
    }
  });
