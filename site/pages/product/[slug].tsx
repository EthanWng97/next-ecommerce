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
import MainPart from '@components/product/MainPart';
import Description from '@components/product/Description';
import Reviews from '@components/product/Reviews';

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export default function Product(props) {
  const { product } = props;

  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
      return <div>Loading...</div>
  }

  return (
    <div>
      {product ? (
        <Layout>
          <MainPart product = { product }></MainPart>
        <Description description = { product.description }></Description>
        <Reviews reviews = { product.reviews }></Reviews> 
        </Layout>
      ) : ""}
    </div>
  )

};


export async function getStaticProps(context) {

    const {params: { slug }} = context

    const {data} = await client.query({
        query: PRODUCT_BY_SLUG_QUERY,
        variables: { slug }
    })

    return {
        props: {
            product: data?.product || {},
        },
        revalidate: 1
    };
}

export async function getStaticPaths () {
  const {data} = await client.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug: "moti·s-lite-pod-with-3-nicotine" }
  })

    const pathsData = []

    data?.products?.nodes && data?.products?.nodes.map((product) => {
        if (!isEmpty(product?.slug)) {
            pathsData.push({ params: { slug: product?.slug } })
        }
    })
 
    // pathsData.push({ params: { slug: data?.slug } })

    return {
        paths: pathsData,
        fallback: true
    }
}
