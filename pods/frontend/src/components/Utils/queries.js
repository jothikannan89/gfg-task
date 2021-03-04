import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
query User($email: String!) {
    userByEmail(email: $email) {
     id,
     email,
     name
    }
}
`;

export const CURRENT_ORDER = gql`
query UserOrders($id: ID!) {
   user(id: $id){
       orders{
         id,
         discountedPrice,
         status,
         price,
         items{
           product{
             name,
             price
           }
           count
         },
         log{
           date
         }
       }
     }
}
`;

export const PRODUCTS = gql`
query{
    products{
    id,
    name,
    price,
    rating,
    type
}
}
`;