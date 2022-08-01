import { useMutation } from "@apollo/client";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { useState } from "react";

import { useRouter } from "next/router";
import { RootState } from "@components/store/store";
import UPDATE_SHIPPING_METHODS from "@woocommerce/cart/graphql/update-shipping-methods";

const CartTotals = ({
  refetchCartData,
  getCartLoading,
}: {
  refetchCartData: any;
  getCartLoading: boolean;
}) => {
  const router = useRouter();
  const handleClickCheckoutButton = (event) => {
    event.preventDefault();
    router.push("/checkout");
  };
  const cart = useSelector((state: RootState) => state.cart);

  const [requestError, setRequestError] = useState("");

  const [
    updateShippingMethods,
    {
      data: updateShippingMethodsResponse,
      loading: updateShippingMethodsLoading,
      error: updateShippingMethodsError,
    },
  ] = useMutation(UPDATE_SHIPPING_METHODS, {
    onCompleted: () => {
      refetchCartData();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  const handleUpdateShippingMethodsClick = (
    event: any,
    newShippingMethodId: string
  ) => {
    event.stopPropagation();
    if (newShippingMethodId.length > 0) {
      updateShippingMethods({
        variables: {
          input: {
            clientMutationId: v4(),
            shippingMethods: newShippingMethodId,
          },
        },
      });
    }
  };

  return (
    <section
      aria-labelledby="summary-heading"
      className="sticky top-5 mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">
            {cart.value.subtotal}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          {cart.value.availableShippingMethods ? (
            <fieldset>
              <legend className="sr-only">Plan</legend>
              <div className="space-y-5">
                {cart.value.availableShippingMethods.map(
                  (shippingMethod: any) => (
                    <div
                      key={shippingMethod.id}
                      className="relative flex items-start"
                    >
                      <div className="flex h-5 items-center">
                        <input
                          id={shippingMethod.id}
                          aria-describedby={`${shippingMethod.id}-description`}
                          name="plan"
                          type="radio"
                          checked={
                            shippingMethod.id ===
                            cart.value.chosenShippingMethods
                          }
                          onChange={(event) => {
                            handleUpdateShippingMethodsClick(
                              event,
                              shippingMethod.id
                            );
                          }}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor={shippingMethod.id}
                          className="font-medium text-gray-700"
                        >
                          {shippingMethod.label}
                        </label>
                        <p
                          id={`${shippingMethod.id}-description`}
                          className="text-gray-500"
                        >
                          {"$" + shippingMethod.cost}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </fieldset>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex items-center justify-between pt-4">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <a
              href="#"
              className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">
                Learn more about how shipping is calculated
              </span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">
            {cart.value.shippingTotal}
          </dd>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Order total</dt>
          <dd className="text-base font-medium text-gray-900">
            {cart.value.total}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <button
          onClick={handleClickCheckoutButton}
          type="submit"
          className={
            "w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm " +
            (getCartLoading || updateShippingMethodsLoading
              ? "disabled cursor-not-allowed bg-indigo-400"
              : "hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 ")
          }
        >
          Checkout
        </button>
      </div>
    </section>
  );
};

export default CartTotals;
