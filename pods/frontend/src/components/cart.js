import React  from 'react'
import { connect } from "react-redux";
import {IncreaseQuantity,DecreaseQuantity,DeleteCart, FetchCart} from './actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop:25,
        padding:10
      },
      table: {
        minWidth: 650,
      },
      labelPlacementStart: {
        display: 'flex', justifyContent: 'flex-end'
     },
     titleItemRight: {
        height: 50,
        float: "right",
        marginTop:20
      }
  })

function Cart({items,IncreaseQuantity,DecreaseQuantity,DeleteCart}){
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

    let ListCart = [];
    let TotalCart=0;
    Object.keys(items.Carts).forEach(function(item){
        TotalCart+=items.Carts[item].quantity * items.Carts[item].price;
        ListCart.push(items.Carts[item]);
    });
    function TotalPrice(price,tonggia){
        return Number(price * tonggia).toLocaleString('en-US');
    }

    const discountArea = (TotalCart) =>{
        if(TotalCart >0){
            return(
                <>
                <div className={classes.labelPlacementStart}>
                <FormControlLabel
                    control={<Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
        
                    />}
                    label="Enable Discount"
                />
                </div>
                <div className="total">
                    <h3>Total</h3> 
                    <p>{Number(TotalCart).toLocaleString('en-US')} $</p>
                </div>
                <Button variant="contained" color="primary" className={classes.titleItemRight}>
                    Place Order
                </Button>
            </>
            )
        }else{
            return null
        }
    }
    
    return(
        <>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Quantity</TableCell>  
                <TableCell align="left">Price</TableCell>               
                <TableCell align="left">Total Price</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {ListCart.map((item,key) => (
                <TableRow key={key}>

                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={()=>DecreaseQuantity(key)} >_</Button>
                    <Button>{item.quantity}</Button>
                    <Button onClick={()=>IncreaseQuantity(key)}>+</Button>
                </ButtonGroup>
                </TableCell>          
                <TableCell align="left">{item.price}</TableCell>      
                <TableCell align="left">{ TotalPrice(item.price,item.quantity)}</TableCell>
                <TableCell>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>DeleteCart(key)} >
                        <CancelIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

        </TableContainer>
        {discountArea(TotalCart)}
        </>
    )
}
const mapStateToProps = state =>{
    //console.log(state)
    return{
        items:state._todoProduct
    }
}

export default connect(mapStateToProps,{FetchCart,IncreaseQuantity,DecreaseQuantity,DeleteCart})(Cart)
