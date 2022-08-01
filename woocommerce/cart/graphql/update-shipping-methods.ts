import { gql } from "@apollo/client";

/**
 * Update Shipping Methods
 */
const UPDATE_SHIPPING_METHODS = gql`
  mutation UPDATE_CART($input: UpdateShippingMethodInput!) {
    updateShippingMethod(input: $input) {
      cart {
        chosenShippingMethods
        shippingTotal
        total
        subtotal
        chosenShippingMethods
      }
    }
  }
`;

export default UPDATE_SHIPPING_METHODS;
