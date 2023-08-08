import * as React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import AppAppBar from './views/AppAppBar';
import AppForm from './views/AppForm';
import withRoot from './withRoot';
import Scrollbar from './components/SCrollBar';
import SeverityPill from './components/SeverityPill';
import { useEffect } from 'react';
import { orderList } from '../config/ApiService';
import { useQuery } from 'react-query';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
  } from '@mui/material';
 

  const statusMap = {
    pending: 'warning',
    delivered: 'success',
    refunded: 'error'
  };


function OrderList(props) {
    const { sx } = props; 
    const email = localStorage.getItem("USER_ID");

    const {status, data: orders, error} = useQuery("orderlist", orderList);

    if (status === "loading") {
        return <span>Loading...</span>;
    }
    
    if (status === "error") {
        return <span>Error: {error.message}</span>;
    }
    return (
        <>
        <AppAppBar />
        <Card sx={sx}>
          <CardHeader title="신청목록" />
          <Scrollbar sx={{ flexGrow: 1 }}>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      작성일
                    </TableCell>
                    <TableCell>
                      장소
                    </TableCell>
                    <TableCell sortDirection="desc">
                      여행기간
                    </TableCell>
                    <TableCell>
                      진행상태
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => { 
                    return (
                      <TableRow
                        hover
                        key={order.orderId}
                      >
                        <TableCell>
                            {order.startedAt}
                        </TableCell>
                        <TableCell>
                            {order.orderLocation}
                        </TableCell>
                        <TableCell>
                            {order.startedAt} ~ {order.endedAt}
                        </TableCell>
                        <TableCell>
                          <SeverityPill color={statusMap[order.status]}>
                            {order.status}
                          </SeverityPill>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Scrollbar>
          {/* <Divider /> */}
          {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              color="inherit"
              endIcon={(
                <SvgIcon fontSize="small">
                  <ArrowRightIcon />
                </SvgIcon>
              )}
              size="small"
              variant="text"
            >
              View all
            </Button>
          </CardActions> */}
        </Card>
        </>
      );
    };
    
    OrderList.prototype = {
      orders: PropTypes.array,
      sx: PropTypes.object
    };
 
    export default withRoot(OrderList);

 