import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";

import { getFormattedCart } from "@components/cart/utils/getFormattedCart";
import { update } from "@components/store/cart/slice";

import GET_CART from "@woocommerce/cart/graphql/get-cart";
import CartTotals from "./CartTotals";
import CartItems from "./CartItems";
import RelatedItems from "./RelatedItems";

const CartContainer = () => {
  const dispatch = useDispatch();
  // Get Cart Data
  const {
    loading: getCartLoading,
    error,
    data,
    refetch: refetchCartData,
  } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const formattedCartData = getFormattedCart(data);
      dispatch(update(formattedCartData));
      console.log("get cart data from parent");
    },
  });

  return (
    <>
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-1">
        <CartItems
          refetchCartData={refetchCartData}
          getCartLoading={getCartLoading}
        />
        <CartTotals
          refetchCartData={refetchCartData}
          getCartLoading={getCartLoading}
        />
      </div>
      <RelatedItems />
    </>
  );
};

export default CartContainer;
