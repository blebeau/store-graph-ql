import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
mutation addToCart($productId: Int!) {
  addToCart(input: { productId: $productId }) {
	total
  }
}
`;

export const ADD_TO_STORE = gql`
mutation addToStore($id: Int!,
  $title: String,
  $thumbnail: String,
  $price: Float, 
  $category: String) {
    addToStore(input: { 
      id: $id,
      title: $title,
      thumbnail: $thumbnail, 
      price: $price,
      category: $category,
    }) {
      id
      title
      thumbnail
      price
      category
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

export const GET_CATEGORIES = gql`
query getCategories {
  categories { id
  title }
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