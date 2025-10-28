import { z } from 'zod';

// Hora obligatoria con mensajes correctos
const TimeStringObligatorio = z
  .string()
  .trim()
  .min(1, { message: 'Campo obligatorio' })
  .regex(/^\d{2}:\d{2}$/, { message: 'Debe tener formato HH:MM' });

// String opcional (permite '' sin error)
const OptStr = z.string().trim().optional().or(z.literal(''));

// Número opcional >= 0 (sin convertir '' a 0)
export const OptNum = z
  .union([z.string(), z.number(), z.null(), z.undefined()]) // acepta lo que venga del input
  .transform((v) => {
    if (v === '' || v === null || v === undefined) return undefined; // vacío => opcional
    return typeof v === 'number' ? v : Number(v); // intenta convertir string a número
  })
  .refine((v) => v === undefined || !Number.isNaN(v), {
    message: 'Debe ser un número ',
  })
  .optional();

// 2) Subesquemas

const ColGranulometria = z.object({
  // Si quieres que HORA sea obligatoria cambia a TimeStringObligatorio
  hora: OptStr,
  silo_n: OptNum,
  humedad: OptNum,
  malla_35: OptNum,
  malla_40: OptNum,
  malla_50: OptNum,
  malla_70: OptNum,
  malla_100: OptNum,
  malla_120: OptNum,
  fondo: OptNum,
});

const FosaRow = z.object({
  label: z.string(), // "1" | "2" | "SERVICIO"
  densidad: OptNum,
  viscosidad: OptNum,
  residuos: OptNum,
});

const TablaAtomizadoRow = z.object({
  // Si quieres, usa TimeStringObligatorio u opcional:
  hora: TimeStringObligatorio,
  pba1_bareas: OptNum,
  pa1_bareas: OptNum,
  pba2_bareas: OptNum,
  pa2_bareas: OptNum,
  pba3_bareas: OptNum,
  pa3_bareas: OptNum,
  te_c1: OptNum,
  te_c2: OptNum,
  ts_c: OptNum,
  lanz_n: OptNum,
  humedad1: OptNum,
  silo_descarga: OptNum,
  producto: OptNum, // si "producto" es texto, cámbialo a OptStr
  n_silo_llenos: OptNum,
});

// 3) Esquema principal

export const FormSchema = z
  .object({
    fecha: z.string().trim().min(1, 'Fecha requerida'),
    hora_inicio: TimeStringObligatorio,
    hora_final: TimeStringObligatorio,
    turno: z.string().trim().min(1, 'Turno requerido'),
    nombre_operador: z.string().trim().min(1, 'Operador requerido'),
    supervisor_turno: z.string().trim().min(1, 'Supervisor requerido'),

    observaciones: z
      .array(z.string().trim().min(1, 'Observación vacía'))
      .default([]),

    // Si no son obligatorias, no hace falta min(0); por defecto se permite longitud 0
    control_granulometria: z.array(ColGranulometria).default([]),
    control_fosas: z.array(FosaRow).default([]),

    // tope 8 filas como pediste
    tabla_atomizado: z.array(TablaAtomizadoRow).max(8).default([]),
  })
  // (Opcional) Validación cruzada: hora_final > hora_inicio
  .refine(
    (d) => {
      // compara como strings "HH:MM" (sirve en formato 24h)
      return d.hora_inicio <= d.hora_final;
    },
    {
      message: 'La hora final debe ser mayor o igual a la hora de inicio',
      path: ['hora_final'],
    }
  );
