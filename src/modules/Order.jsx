import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import AppAppBar from './views/AppAppBar';
import AppForm from './views/AppForm';
import Typography from './components/Typography';
import withRoot from './withRoot';
import { call, order, orderList } from '../config/ApiService';
import { Field, Form, FormSpy } from 'react-final-form';
import { Box } from '@mui/system';
import FormButton from './form/FormButton';
import RFTextField from './form/RFTextField';
import FormFeedback from './form/FormFeedback';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { required } from './form/validation';
import MenuItem from '@mui/material/MenuItem';
 

const ORDER_NAME = localStorage.getItem("USER_NAME");
const ORDER_EMAIL = localStorage.getItem("USER_ID");

const location = [
    { label: '선택', value: '-' },
    { label: '동남아시아', value: 'eastasia' },
    { label: '일본', value: 'japan' },
    { label: '유럽', value: 'europe' },
    { label: '미국', value: 'usa' },
]

const person = [
    { label: '선택', value: '-' },
    { label: '1명', value: '1' },
    { label: '2명', value: '2' },
    { label: '3명', value: '3' },
    { label: '4명', value: '4' },
]

const date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const dateStr = `${year}/${month}/${day}`;


 
function Order() { 
    const [sent, setSent] = React.useState(false);

 

    const handleSubmit = (values) => {
        order(values)
        .then(
          (response) => {
            console.log("order end : " + response);
            window.location.href = "/order-list";
          }
        )
     
        setSent(true); 
    }

    const validate = (values) => {
        const errors = required(['orderLocation', 'orderAdult', 'orderChild', 
                                'startedAt','endedAt', 'orderContent' ], values);     
        return errors;
      };



    return (
        <>
        <AppAppBar />
        <AppForm>
            <>
                <Typography variant="h4" gutterBottom marked="center" align="center">
                    여행계획을 작성하세요
                </Typography>
            </>
        <Form
            onSubmit={handleSubmit}
            subscription={{ submitting: true }} 
            validate={validate}
        >
            {({ handleSubmit: handleSubmit2, submitting }) => (
                 <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
                 <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>       
                        <Field 
                            component={RFTextField}
                            disabled
                            fullWidth
                            label="작성자"
                            name="orderName"
                            defaultValue={ORDER_NAME}
                        />  
                    </Grid>
                    <Grid item xs={12} sm={6}>       
                        <Field 
                            component={RFTextField}
                            disabled
                            fullWidth
                            label="author"
                            name="orderEmail"
                            defaultValue={ORDER_EMAIL}
                        />  
                    </Grid>
                    <Grid item xs={12} sm={6}>       
                        <Field 
                            component={RFTextField}
                            disabled={submitting || sent}
                            autoComplete="location"
                            fullWidth
                            label="location"
                            name="orderLocation"
                            required
                            select
                            // helperText="여행지역선택"
                            defaultValue={'-'}
                        >
                            {
                                location.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    )
                                )
                            }                         
                        </Field>  
                    </Grid>
                    <Grid item xs={12} sm={3}>                        
                        <Field 
                     
                            component={RFTextField}
                            disabled={submitting || sent}
                            autoComplete="adult"
                            fullWidth
                            label="성인"
                            name="orderAdult"
                            required
                            select
                            // helperText="여행지역선택"
                            defaultValue={"-"}
                        >
                            {
                                person.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    )
                                )
                            }                         
                        </Field>    
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Field 
                          
                                component={RFTextField}
                                disabled={submitting || sent}
                                autoComplete="child"
                                fullWidth
                                label="어린이"
                                name="orderChild"
                                required
                                select
                                // helperText="여행지역선택"
                                defaultValue={"-"}
                            >
                                {
                                    person.map((option) => (
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
                                autoComplete="startedAt"
                                fullWidth
                                label="출발일(YYYY/MM/DD)"
                                name="startedAt"
                                required
                                // helperText="여행지역선택"
                                defaultValue={dateStr}
                        >
                        </Field>    
                    </Grid>    
                    <Grid item xs={12} sm={6}>
                        <Field 
                          
                                component={RFTextField}
                                disabled={submitting || sent}
                                autoComplete="endedAt"
                                fullWidth
                                label="도착일(YYYY/MM/DD)"
                                name="endedAt"
                                required
                                // helperText="여행지역선택"
                                defaultValue={dateStr}
                        >
                        </Field>    
                    </Grid>       
                    <Grid item xs={12} sm={12}>
                        <Field 
                          
                                component={RFTextField}
                                disabled={submitting || sent}
                                autoComplete="orderContent"
                                fullWidth
                                multiline
                                rows={10}
                                label="여행계획"
                                name="orderContent"
                                required
                                helperText="내용을 입력하세요" 
                        >
                        </Field>    
                    </Grid>                              
                </Grid>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker 
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)} 
                            label="출발일" 
                            name="startedDate"
                        />
                        <DatePicker label="도착일" />
                    </DemoContainer>
                </LocalizationProvider>  */}
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
        </>

    )
}
 
export default withRoot(Order);