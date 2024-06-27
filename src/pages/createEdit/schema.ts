import { parse, isValid, isAfter, startOfDay } from 'date-fns';
import * as yup from 'yup';

const regexLogo = /https?:\/\/(www\.).*\.(?:png|jpg|jpeg|gif|bmp|webp)/g; // https://www.visa.jpg
const regexDate = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // dd/mm/yyyy
const today = startOfDay(new Date());

export const schema = yup.object().shape({
  id: yup
    .string()
    .required('Id es requerido.')
    .min(3, 'Mínimo 3 caracteres.')
    .max(10, 'Máximo 10 caracteres.'),
  name: yup
    .string()
    .required('Nombre es requerido.')
    .min(5, 'Mínimo 5 caracteres.')
    .max(100, 'Máximo 100 caracteres.'),
  description: yup
    .string()
    .required('Descripción es requerido.')
    .min(10, 'Mínimo 10 caracteres.')
    .max(200, 'Máximo 200 caracteres.'),
  logo: yup
    .string()
    .required('Logo es requerido.')
    .matches(regexLogo, 'Agrege una URL valida, ejm: https://www.visa.jpg'),
  date_release: yup
    .string()
    .required('Fecha de liberación es requerido.')
    .matches(regexDate, 'Formato Valido dd/mm/yyyy')
    .test('is-today-or-after', 'La fecha debe ser hoy o una fecha posterior', (value) => {
      if (!value) return false;

      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      if (!isValid(parsedDate)) return false;

      const isFutureOrToday =
        isAfter(parsedDate, today) || parsedDate.getTime() === today.getTime();
      return isFutureOrToday;
    }),
  date_revision: yup.string().required('Fecha de revision es requerido.'),
});
