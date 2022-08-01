import { XCircleIcon, XIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { useMutation } from "@apollo/client";
import { v4 } from "uuid";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UPDATE_ITEMS from "@woocommerce/cart/graphql/update-items";

import { RootState } from "@components/store/store";
import SingleItem from "@components/cart/SingleItem";

const CartItems = ({
  refetchCartData,
  getCartLoading,
}: {
  refetchCartData: any;
  getCartLoading: boolean;
}) => {
  // get cart data
  const cart = useSelector((state: RootState) => state.cart);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // update cart mutation
  const [
    updateItems,
    {
      data: updateItemsResponse,
      loading: updateItemsLoading,
      error: updateItemsError,
    },
  ] = useMutation(UPDATE_ITEMS, {
    onCompleted: () => {
      refetchCartData();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        if (errorMessages.indexOf(errorMessage) > -1) return;
        setErrorMessages([...errorMessages, errorMessage]);
      }
    },
  });

  const handleUpdateProductQuantityClick = (
    event: any,
    product: any,
    newProductQuantity: number
  ) => {
    event.stopPropagation();
    const productKey = product.key;
    const productStockQuantity = product.stockQuantity;
    const productName = product.name;
    const productAttributeString = product?.attributesString ?? "";
    const errorMessage =
      "Quantity of " +
      productName +
      " " +
      productAttributeString +
      " must be between 1 and " +
      productStockQuantity;

    if (newProductQuantity > productStockQuantity || newProductQuantity <= 0) {
      if (errorMessages.indexOf(errorMessage) > -1) return;
      setErrorMessages([...errorMessages, errorMessage]);
      return;
    }
    if (productKey.length > 0) {
      deleteErrorMessages(errorMessage);
      const updatedItems = [
        {
          key: productKey,
          quantity: newProductQuantity,
        },
      ];
      updateItems({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };
  const handleRemoveProductClick = (event: any, product: any) => {
    event.stopPropagation();
    const productKey = product.key;

    if (productKey.length > 0) {
      const updatedItems = [
        {
          key: productKey,
          quantity: 0,
        },
      ];
      updateItems({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };
  const deleteErrorMessages = (errorMessage: string) => {
    setErrorMessages(errorMessages.filter((item) => item !== errorMessage));
  };
  // useEffect(() => {
  //   console.log("errorMessages is now: ", requestError);
  // }, [errorMessages]);

  if (cart.value === undefined) {
    return <div> Loading...</div>;
  }

  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      {errorMessages.length > 0
        ? errorMessages.map((errorMessage, index) => (
            <div key={index} className="mb-2 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 key={index} className="text-sm font-medium text-red-800">
                    {errorMessage}
                  </h3>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                      onClick={() => {
                        deleteErrorMessages(errorMessage);
                      }}
                    >
                      <span className="sr-only">Dismiss</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}

      {cart.value && cart.value.products ? (
        <div>
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>
          <ul
            role="list"
            className="divide-y divide-gray-200 border-t border-b border-gray-200"
          >
            {cart.value.products.map((product: any, productIdx) => (
              <SingleItem
                key={product.productId}
                product={product}
                productIdx={productIdx}
                handleUpdateProductQuantityClick={
                  handleUpdateProductQuantityClick
                }
                handleRemoveProductClick={handleRemoveProductClick}
                getCartLoading={getCartLoading}
                updateItemsLoading={updateItemsLoading}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>no cart data</div>
      )}
    </section>
  );
};

export default CartItems;
