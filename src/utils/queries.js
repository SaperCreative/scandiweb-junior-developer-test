import { gql } from "@apollo/client";

export const GET_CATEGORY_NAMES = gql`
  {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS_LIST = gql`
  query category($type: CategoryInput) {
    category(input: $type) {
      products {
        id
        brand
        name
        inStock
        gallery
        attributes {
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_CURRENCY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;