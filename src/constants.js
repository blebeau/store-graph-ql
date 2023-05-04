import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
mutation addToCart($productId: Int!) {
  addToCart(input: { productId: $productId }) {
	total
  }
}
`;

export const ADD_TO_STORE = gql`
mutation addToStore($productName: String, $productName: String) {
  addToStore(input: { productName: $productName, productName: $productName  }) {
	total
  }
}
`;

export const GET_PRODUCTS = gql`
query getProducts {
  products { id
  title
  thumbnail }
  }
`;

export const GET_CART = gql`
  query getCart {
    cart {
      total
      products {
        id
        title
        thumbnail
      }
    }
  }
`;