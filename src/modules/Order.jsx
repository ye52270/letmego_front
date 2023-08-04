import * as React from 'react';
import AppAppBar from './views/AppAppBar';
import AppForm from './views/AppForm';
import Typography from './components/Typography';
import withRoot from './withRoot';

function Order() {

    return (
        <React.Fragment>
            <AppAppBar />
            <AppForm>
                <React.Fragment>
                <Typography variant="h3" gutterBottom marked="center" align="center">
                    여행계획을 작성하세요
                </Typography>
                </React.Fragment>
            </AppForm>
        </React.Fragment>
    )
}
export default withRoot(Order);