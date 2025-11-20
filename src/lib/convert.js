import { z } from 'zod';

export const normalize = (s) =>
  String(s ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export const reqTime = (label) =>
  z
    .string({
      required_error: `Se requiere ${label}`,
      invalid_type_error: `El campo ${label} debe ser texto`,
    })
    .trim()
    .refine((s) => /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.test(s), {
      message: `${label} debe tener formato HH:mm o HH:mm:ss`,
    })
    .transform((s) => {
      // Normaliza a HH:mm:ss
      const [hh, mm, ss] = s.split(':');
      return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${(
        ss ?? '00'
      ).padStart(2, '0')}`;
    });

export const optNum = (label) =>
  z.preprocess(
    (val) => {
      // Si el valor es cadena vacía, lo tratamos como undefined
      if (val === '') return undefined;
      // Si viene como string numérico, intenta convertir
      if (typeof val === 'string') return Number(val);
      return val;
    },
    z
      .number({
        invalid_type_error: `El campo ${label} debe ser numérico`,
        required_error: `Se requiere ${label}`,
      })
      .min(0, `${label} debe ser mayor o igual a 0`)
      .nullish() // ← permite undefined si estaba vacío
  );

export const optStr = (label) => {
  return z
    .string({
      required_error: `Se requiere ${label}`,
      invalid_type_error: `El campo ${label} debe ser texto`,
    })
    .trim()
    .nullish()
    .optional();
};

export const reqStr = (label) => {
  return z
    .string({
      required_error: `Se requiere ${label}`,
      invalid_type_error: `El campo ${label} debe ser texto`,
    })
    .trim()
    .min(1, `El campo ${label} debe ser más de un caracter`);
};

export const reqNum = (label) =>
  z.coerce
    .number({
      required_error: `Se requiere ${label}`,
      invalid_type_error: `El campo ${label} debe ser numérico`,
    })
    .finite(`${label} debe ser numérico válido`) // ✅ reemplaza refine
    .min(1, `Debe ser mayor o igual a 1`)
    .int();

export const reqPct = (label) => {
  return reqFloat(label)
    .finite(`${label} debe ser numérico válido`)
    .min(0, `${label} debe ser ≥ 0`)
    .max(100, `${label} debe ser ≤ 100`);
};

export const reqFloat = (label) => {
  return z.coerce
    .number({
      required_error: `Se requiere ${label}`,
      invalid_type_error: `El campo ${label} debe ser numérico`,
    })
    .finite(`${label} debe ser numérico válido`)
    .min(0, `Debe se mas de un caracter ${label} `);
};
