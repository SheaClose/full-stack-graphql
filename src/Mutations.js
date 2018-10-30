import { gql } from "apollo-boost";

export const ADD_PRODUCT = gql`
  mutation addProduct($id: ID, $name: String, $price: Float, $color: String) {
    addProduct(id: $id, name: $name, price: $price, color: $color) {
      id
      price
      name
      color
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID) {
    deleteProduct(id: $id)
  }
`;
