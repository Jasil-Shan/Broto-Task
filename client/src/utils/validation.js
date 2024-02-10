import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().trim().required('Name required'),
  email: Yup.string().trim().email('Invalid email address').test(
    'dot',
    'Incorrect Email format',
    (value) => value && value.includes('.')).required(' Email required'),
  place: Yup.string().trim().required('Place required'),
  batch: Yup.string().trim().required('Batch required'),
  domain: Yup.string().trim().required('Domain required'),
  phone: Yup.number().required('Phone required')
})