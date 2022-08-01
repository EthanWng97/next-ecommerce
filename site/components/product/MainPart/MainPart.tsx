import Layout from '@components/common/Layout';
import { useRouter } from 'next/router';
import client from '@components/apollo/client';
import AddToCartButton from '@components/cart/AddToCartButton';
import {PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS} from '@woocommerce/product/graphql/product-by-slug';
import { isEmpty } from 'lodash';
import GalleryCarousel from "@components/single-product/gallery-carousel";
import Price from "@components/single-product/price";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  HeartIcon,
  MenuIcon,
  MinusSmIcon,
  PlusSmIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";

import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/solid";

import QuantityOption from './QuantityOption';
import Variant from './Variant';
import Image from './Image';
import ProductPrice from './ProductPrice';

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// For current selectedAllFlavor, find its correct product
function isCorrectProduct(target: any, allFlavor: any) {
  for(let i = 0; i < allFlavor.length; i++) {
    if(target[i].value != allFlavor[i]) {
      return false
    }
  }
  return true
}


function findAvailableProductsHelper(flavors, r) {
  return r === "" || r === null || flavors.includes(r)
}

// When customer only selects part of all flavor, find available products and return an array of their databaseId
function findAvailableProducts(products: any, selectedAllFlavor: any) {
  let availableProducts = [];
  products.forEach(product => {
    let thisFlavors = new Array<String>();
    product.attributes.nodes.forEach(option => {
      thisFlavors.push(option.value);
    })
    const found = selectedAllFlavor.every(r => findAvailableProductsHelper(thisFlavors, r) )
    if (found) {
      availableProducts.push(product.databaseId);
    }
  });
  return availableProducts;
}

const MainPart = (props: any) => {
    const { product } = props;

    const [selectedAllFlavor, setSelectedAllFlavor] = useState([]);
    useEffect(() => {
      let productInfo = new Map<string, string>([
        ["databaseId", product.databaseId],
        ["regularPrice", product.regularPrice],
        ["stockQuantity", product.stockQuantity],
        ["sourceUrl", [product.image.sourceUrl]]
      ]);
      product.variations.nodes.map((node: any) => {
        if(isCorrectProduct(node.attributes.nodes, selectedAllFlavor)) {
          productInfo = new Map<string, string>([
            ["databaseId", node.databaseId],
            ["regularPrice", node.regularPrice],
            ["stockQuantity", node.stockQuantity],
            ["sourceUrl", [node.image.sourceUrl]]
        ]);
        }
      })
      setSelectedProductInfo(productInfo)
      setAvailableProducts(findAvailableProducts(product.variations.nodes, selectedAllFlavor));

    }, [selectedAllFlavor])

    // initialize selectedProductInfo
    const [selectedProductInfo, setSelectedProductInfo] = useState(
      new Map<string, string>([
        ["databaseId", product.databaseId],
        ["regularPrice", product.regularPrice],
        ["stockQuantity", product.stockQuantity],
        ["sourceUrl", [product.image.sourceUrl]]
      ])
    );

    const [availableProducts, setAvailableProducts] = useState([]);

	return (
		<div>
			{ product ? (
        <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto lg:max-w-none">
            {/* Product */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                {/* Image gallery */}
                <Image product={ product } targetDatabaseId={ selectedProductInfo.get("databaseId") }></Image>
                
            {/* product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    {product.name}
                </h1>

            <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">{product.price}</p>
            </div>

      {/* Reviews */}
      <div className="mt-3">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  product.averageRating > rating
                    ? "text-indigo-500"
                    : "text-gray-300",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="sr-only">{product.averageRating} out of 5 stars</p>
        </div>

          <ProductPrice product={ product } targetDatabaseId={ selectedProductInfo.get("databaseId") }></ProductPrice>

      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>

        <div
          className="text-base text-gray-700 space-y-6"
          dangerouslySetInnerHTML={{ __html: product.shortDescription }}
        />
      </div>

      <form className="mt-6">
        
        {
          product.attributes.nodes.map((value: any, index: any) => (
            <Variant variations_nodes={product.variations.nodes} title_label={value.label} variation_label={product.variations.nodes[0].attributes.nodes[index].label} selectedAllFlavor={ selectedAllFlavor } setSelectedAllFlavor={ setSelectedAllFlavor } index={index} availableProducts={ availableProducts }></Variant>
          ))
        }


        <div className="mt-10 flex sm:flex-col1">
          <div className="flex justify-center">
            <div className="max-w-xs flex-1 border border-transparent rounded-md py-3 px-8 flex">
            <QuantityOption qty={selectedProductInfo.get("stockQuantity")}></QuantityOption>
            </div>
          </div>
          <button
            type="submit"
            className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
          >
            ADD TO CART
          </button>
        </div>
      </form>
            </div>
            </div>
            </div>
        </main>
			) : (
				''
			) }
		</div>
	);
}

export default MainPart;