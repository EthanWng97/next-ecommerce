import {
  XIcon as XIconSolid,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import Image from "next/image";

const SingleItem = ({
  product,
  productIdx,
  handleUpdateProductQuantityClick,
  handleRemoveProductClick,
  getCartLoading,
  updateItemsLoading,
}: {
  product: any;
  productIdx: number;
  handleUpdateProductQuantityClick: any;
  handleRemoveProductClick: any;
  getCartLoading: boolean;
  updateItemsLoading: boolean;
}) => {
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  useEffect(() => {
    setProductQuantity(product.quantity);
  }, [product]);

  return (
    <li key={product.productId} className="flex py-6 sm:py-10">
      <div className="relative h-24 w-24 flex-shrink-0 object-cover object-center sm:h-48 sm:w-48">
        <Image
          src={product.image.sourceUrl}
          alt={product.image.altText}
          layout="fill"
          className="rounded-md"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a
                  href={product.href}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </a>
              </h3>
            </div>
            cart.
            <div className="mt-1 flex text-sm">
              {product.attributesString ? (
                <p className="text-gray-500">{product.attributesString}</p>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {product.total}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
              Quantity, {product.name}
            </label>
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={
                  "relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500  " +
                  (getCartLoading || updateItemsLoading
                    ? "disabled cursor-not-allowed bg-gray-100"
                    : "hover:bg-gray-50 focus:z-10 focus:outline-none")
                }
                onClick={(event) => {
                  const newProductQuantity = product.quantity - 1;
                  handleUpdateProductQuantityClick(
                    event,
                    product,
                    newProductQuantity
                  );
                }}
              >
                <span className="sr-only">Minus</span>
                <MinusIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <input
                type="number"
                id="product-quantity"
                name="product-quantity"
                value={productQuantity}
                min={1}
                max={100}
                step={1}
                className={
                  "block w-10 border-l-0 border-r-0 border-gray-300  sm:text-sm " +
                  (getCartLoading || updateItemsLoading
                    ? "disabled cursor-not-allowed border-gray-300"
                    : "focus:border-indigo-500 focus:ring-indigo-500")
                }
                onChange={(event) => {
                  setProductQuantity(event.target.value);
                }}
                onBlur={(event) => {
                  const newProductQuantity = Number(event.target.value);
                  if (newProductQuantity === productQuantity) {
                    return;
                  }
                  handleUpdateProductQuantityClick(
                    event,
                    product,
                    newProductQuantity
                  );
                }}
              />
              <button
                type="button"
                className={
                  "relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 " +
                  (getCartLoading || updateItemsLoading
                    ? "disabled cursor-not-allowed bg-gray-100"
                    : "hover:bg-gray-50 focus:z-10 focus:outline-none ")
                }
                onClick={(event) => {
                  const newProductQuantity = product.quantity + 1;
                  handleUpdateProductQuantityClick(
                    event,
                    product,
                    newProductQuantity
                  );
                }}
              >
                <span className="sr-only">Plus</span>
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </span>
            <div className="absolute top-0 right-0">
              <button
                type="button"
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                onClick={(event) => {
                  handleRemoveProductClick(event, product);
                }}
              >
                <span className="sr-only">Remove</span>
                <XIconSolid className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleItem;
