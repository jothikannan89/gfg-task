import React,{ forwardRef } from 'react';
import Header from './includes/Header';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useQuery  } from 'react-apollo';
import MaterialTable from 'material-table';
import { getToken } from "./Utils/Common";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { CURRENT_ORDER } from './Utils/queries';
const tableIcons = {
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  };

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


export default function CurrentOrders() {
 const classes = useStyles();

function createData(item) {
    let id = item.id;
    let discount  = item.discountedPrice;
    let status = item.status;
    let products = item.items;
    let price = item.price;
    if(discount === null)
    discount = 0;
    return { id, discount, status , products, price };
  }


const { loading, data } = useQuery(CURRENT_ORDER, {
    variables: { id: getToken() },
  });


if (loading) return <p>Loading ...</p>;
//console.log(data.user.orders);
const orders = data.user.orders;
const dataRows = [];
orders.forEach((item, i) => {
    dataRows.push(createData(item));
});

  return(
    <>
        <Header />
        <h2>CurrentOrders</h2>
        <MaterialTable
        icons={tableIcons}
        options={{
        toolbar: false,
        search: false,
        sorting: true,
        paging: true,
        pageSize: 10
        }}
        title="One Detail Panel Preview"
        columns={[
            { title: 'Order ID', field: 'id' },
            { title: 'Price', field: 'price' },
            { title: 'Discounted Price', field: 'discount'},
            { title: 'Status', field: 'status' },
            
        ]}
        data={dataRows}
        detailPanel={rowData => {
            return (
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="left">Price</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rowData.products.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell >{row.product.name}</TableCell>
                        <TableCell align="left">{row.product.price}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            )
          }}
        />       
    </>
  );
}