import * as yup from 'yup'

export const schema = yup.object({
  firstname: yup
    .string()
    .max(50, 'asd')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo letras')
    .required('El nombre es requerido'),
  lastname: yup.string().required('El apellido es obligatorio'),
  email: yup.string().email().required('Requerido'),
  phone: yup
    .string()
    .matches(/^[0-9]{9}$/, 'Debe tener 9 dígitos')
    .required(),
  birthdate: yup.date().required('La fecha de nacimiento es obligatoria'),
})
