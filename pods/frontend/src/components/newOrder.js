import React,{ forwardRef } from 'react';
import Header from './includes/Header';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery  } from 'react-apollo';
import MaterialTable from 'material-table'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {AddCart} from './actions'
import {connect} from 'react-redux';
import Cart from './cart';
import { PRODUCTS } from './Utils/queries';


const tableIcons = {
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  };

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop:25,
        padding:10
      },
      table: {
        minWidth: 650,
      },
  });
  
function NewOrder(props) {
 const classes = useStyles();

function createData(item) {
    let id = item.id;
    let name  = item.name;
    let price = item.price;
    let type = item.type;
    let rating = item.rating;

    return { id, name, price , type, rating };
  }


const { loading, data } = useQuery(PRODUCTS);


if (loading) return <p>Loading ...</p>;
const products = data.products;
const dataRows = [];
products.forEach((item, i) => {
    dataRows.push(createData(item));
});

  return(
    <>
        <Header />
        <div className={classes.root}>
        <Grid container spacing={3}>
 
        <Grid item xs={6}>
            <h2>Products</h2>
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
                { title: 'Name', field: 'name'},
                { title: 'Price', field: 'price' },
                { title: 'Type', field: 'type' },
                { title: 'Rating', field: 'rating' },
                {
                    field: '',
                    title: 'Action',
                    render: rowData => {
                        return (
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>props.AddCart(rowData)}>
                        <AddShoppingCartIcon />
                        </IconButton>
                    )}
                  }
            ]}
            data={dataRows}
            />
            </Grid>
             
        <Grid item xs={6}>
            <h2>Cart</h2>
            <Cart />
            </Grid>
        </Grid>  
        </div>
    </>
  );
}


function mapDispatchToProps(dispatch){
    return{
        AddCart:item=>dispatch(AddCart(item))
     
    }
}
export default connect('',mapDispatchToProps)(NewOrder)