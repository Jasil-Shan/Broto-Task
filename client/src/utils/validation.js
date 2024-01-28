import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    place: Yup.string().required('Required'),
    batch: Yup.string().required('Required'),
    domain: Yup.string().required('Required'),
    phone: Yup.number().required('Required'),
  })