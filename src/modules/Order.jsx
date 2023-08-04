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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

 
function Order() {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    
    const location = [
        { label: '동남아시아', location: 'eastasia' },
        { label: '일본', location: 'japan' },
        { label: '유럽', location: 'europe' },
        { label: '미국', location: 'usa' },
    ]

    useEffect(
        () => {
            console.log("order component : " + accessToken);
            if(accessToken === "null") {
                window.location.href = "/sign-in";
            }
        }, []
    )
    


    const handleSubmit = (values) => {
        const content = values.content;
        call("/order/test", "GET", content)
        .then(
            (response) => {
                console.log("order start : " + response);
            }
        )
        .catch(
            (error) => console.log(error)
        );
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
                             <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={location}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="어디로가시나요?" />}
                            />
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