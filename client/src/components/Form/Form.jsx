import { TextField, Button, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validation';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px',
  margin: 'auto',
  justifyContent: 'center',
  height: '100vh',
});

const StyledButton = styled(Button)({
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  fontWeight: 'bold',
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      place: '',
      batch: '',
      domain: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          size="small"
          label="Username"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
        <TextField
          size="small"
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
        <TextField
          size="small"
          label="Place"
          type="text"
          name="place"
          value={formik.values.place}
          onChange={formik.handleChange}
          error={formik.touched.place && Boolean(formik.errors.place)}
          helperText={formik.touched.place && formik.errors.place}
          required
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="batch-label">Batch</InputLabel>
          <Select
            labelId="batch-label"
            id="batch"
            name="batch"
            value={formik.values.batch}
            onChange={formik.handleChange}
            error={formik.touched.batch && Boolean(formik.errors.batch)}
          >
            <MenuItem value={'BCK65'}>BCK65</MenuItem>
            <MenuItem value={'BCK66'}>BCK66</MenuItem>
            <MenuItem value={'BCK67'}>BCK67</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="domain-label">Domain</InputLabel>
          <Select
            labelId="domain-label"
            id="domain"
            name="domain"
            value={formik.values.domain}
            onChange={formik.handleChange}
            error={formik.touched.domain && Boolean(formik.errors.domain)}
          >
            <MenuItem value={'MERN'}>MERN</MenuItem>
            <MenuItem value={'MEAN'}>MEAN</MenuItem>
            <MenuItem value={'Flutter'}>Flutter</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small"
          label="Mobile"
          type="number"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          required
        />
        <StyledButton variant="contained" type="submit">
          Register
        </StyledButton>
      </Stack>
    </StyledForm>
  );
};

export default Form;
