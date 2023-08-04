import * as React from 'react';
import { useEffect } from 'react';
import AppAppBar from './views/AppAppBar';
import AppForm from './views/AppForm';
import Typography from './components/Typography';
import withRoot from './withRoot';
import { call } from '../config/ApiService';
import { Field, Form, FormSpy } from 'react-final-form';
import { Box } from '@mui/system';
import FormButton from './form/FormButton';
import RFTextField from './form/RFTextField';
import FormFeedback from './form/FormFeedback';
import { required } from './form/validation';
 
function Order() {

    const handleSubmit = (values) => {
        console.log(values);
    };
    
 

    
    return (
        <React.Fragment>
            <AppAppBar />
            <AppForm>
                <React.Fragment>
                <Typography variant="h3" gutterBottom marked="center" align="center">
                    여행계획을 작성하세요
                </Typography>
                </React.Fragment>
                <Form
                    onSubmit={handleSubmit}
                    subscription={{ submitting: true }} 
                   
                >
                   {({ handleSubmit: handleSubmit2, submitting }) => (
                        <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
                            <Field
                                autoComplete=""
                                autoFocus
                                component={RFTextField}
 
                                fullWidth
                                label="content"
                                margin="normal"
                                name="content"
                                required
                                size="large"
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
 
                                size="large"
                                color="secondary"
                                fullWidth
                            >
                                { '등록하기'}
                            </FormButton>
                        </Box>
                    )}      
                 </Form>
            </AppForm>
        </React.Fragment>
    )
}
export default withRoot(Order);