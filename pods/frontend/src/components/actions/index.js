
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const FETCH_CART = "FETCH_CART";
/*GET NUMBER CART*/
export function GetNumberCart(){
    return{
        type:'GET_NUMBER_CART'
    }
}
/*ADD TO CART*/
export function AddCart(payload){
    return {
        type:'ADD_CART',
        payload
    }
}

/*UPDATE CART*/
export function UpdateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}

/*DELETE CART*/
export function DeleteCart(payload){
    return{
        type:'DELETE_CART',
        payload
    }
}

/*INCREARE QUANTITY*/
export function IncreaseQuantity(payload){
    return{
        type:'INCREASE_QUANTITY',
        payload
    }
}
/*DECREARE QUANTITY*/
export function DecreaseQuantity(payload){
    return{
        type:'DECREASE_QUANTITY',
        payload
    }
}

/* FETCH CART */
export function FetchCart(payload){
    return{
        type:'FETCH_CART',
        payload
    }
}
