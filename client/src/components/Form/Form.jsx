import { TextField, Button, Stack, Select, MenuItem, InputLabel, FormControl, Container, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validation.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios"


const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  justifyContent: 'center',
  backgroundColor: 'white',
  alignItems: 'center',
  padding: '26px',
  borderRadius: '12px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  '& .MuiFormControl-root': {
    width: '100%',
    marginBottom: '1px',
  },
});


const StyledButton = styled(Button)({
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  fontWeight: 'bold',
});

const Form = () => {
  const navigate = useNavigate()
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
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        const { data } = await axios.post('/upload', { ...values })
        if (data.success) {
          toast.success(data.message, {
            position: "top-center"
          })
          navigate('/table')

        } else {
          toast.error(data.message, {
            position: "top-center"
          })
        }
      } catch (error) {
        console.error('Add Failed', error)
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xl" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: "100vh",
    }} >
      <StyledForm onSubmit={formik.handleSubmit} >
        <h2>Add Student</h2>
        <Stack spacing={2} width={300}>
          <TextField
            size="small"
            label="Username"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            FormHelperTextProps={{ style: { height: "1em" } }}
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
            FormHelperTextProps={{ style: { height: "1em" } }}
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
            FormHelperTextProps={{ style: { height: "1em" } }}
            required
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="batch-label">Batch</InputLabel>
            <Select
              labelId="batch-label"
              id="batch"
              name="batch"
              label="Batch"
              value={formik.values.batch}
              onChange={formik.handleChange}
              error={formik.touched.batch && Boolean(formik.errors.batch)}
              helperText={formik.touched.batch && formik.errors.batch}
              FormHelperTextProps={{ style: { height: "1em" } }}
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
              label="Domain"
              value={formik.values.domain}
              onChange={formik.handleChange}
              error={formik.touched.domain && Boolean(formik.errors.domain)}
              helperText={formik.touched.domain && formik.errors.domain}
              FormHelperTextProps={{ style: { height: "1em" } }}
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
            FormHelperTextProps={{ style: { height: "1em" } }}
            required
          />
          <StyledButton variant="contained" type="submit">
            {formik.isSubmitting ? <CircularProgress size={22} color="success" /> : 'Add'}
          </StyledButton>
        </Stack>
      </StyledForm>
    </Container>
  );
};

export default Form;
