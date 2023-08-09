import * as React from 'react';
import Grid from '@mui/material/Grid';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import Typography from './modules/components/Typography';
import withRoot from './modules/withRoot'; 
import { Field, Form, FormSpy } from 'react-final-form';
import { Box } from '@mui/system';
import FormButton from './modules/form/FormButton';
import RFTextField from './modules/form/RFTextField';

import { email, required } from './modules/form/validation';
import MenuItem from '@mui/material/MenuItem';


import Link from '@mui/material/Link';
import FormFeedback from './modules/form/FormFeedback';
import { signup } from './config/ApiService';
 

function SignUp() {
  const [sent, setSent] = React.useState(false);

  const userRole = [
    { label: '선택', value: '-' },
    { label: '개인회원', value: 'customer' },
    { label: '기업회원', value: 'seller' }, 
] 

  const validate = (values) => {
    const errors = required(['userRole', 'firstName', 'lastName', 'email', 'password' ], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = (values) => {
    signup(values)
    .then(
      (response) => {
        console.log("sign-up end : " + response);
        window.location.href = "/sign-in";
      }
    )
 
    setSent(true);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/premium-themes/onepirate/sign-in/" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
                <Grid container spacing={2}>    
                    <Grid item xs={12} sm={12}>
                        <Field     
                            autoFocus                 
                            component={RFTextField}
                            autoComplete="userRole"
                            fullWidth
                            label="회원구분"
                            name="userRole"
                            required
                            select
                            defaultValue = {"-"}
                        > 
                            {
                                userRole.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    )
                                )
                            }   
                         
                        </Field>    
                    </Grid>
 
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUp);
