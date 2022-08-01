/**
 * Return cart data in the required format
 * @param data - Cart data
 * @returns formattedCart
 */

export const getFormattedCart = (data: any) => {
  const formattedCart: any = {};
  if (data === undefined || data.cart === undefined) {
    return formattedCart;
  }
  const cartData = data.cart;

  // if (undefined === data || !data.cart.contents.nodes.length) {
  //   return formattedCart;
  // }

  for (const key in cartData) {
    if (key === "contents") continue;
    formattedCart[key] = cartData[key];
  }

  const productsData = cartData.contents.nodes;
  formattedCart.products = [];

  // format products data
  for (const productData of productsData) {
    const product: any = {};
    product.total = productData?.total ?? "";
    product.quantity = productData?.quantity ?? 0;
    product.key = productData?.key ?? "";

    const productDetails = productData?.product?.node;
    const type = productDetails?.type ?? "OTHER";

    if (type === "SIMPLE") {
      // simple product
      product.productId = productDetails?.productId ?? "";
      product.name = productDetails?.name ?? "";
      product.slug = productDetails?.slug ?? "";
      product.image = {
        sourceUrl: productDetails?.image?.sourceUrl ?? "",
        title: productDetails?.image?.title ?? "",
        altText: productDetails?.image?.altText ?? "",
      };
      product.stockQuantity = productDetails?.stockQuantity ?? 0;
    }

    // variable product
    if (type === "VARIABLE") {
      const variableDetails = productData?.variation?.node;
      product.productId = variableDetails?.variationId ?? "";
      product.name = productDetails?.name ?? "";
      product.slug = productDetails?.slug ?? "";
      product.image = {
        sourceUrl: variableDetails?.image?.sourceUrl ?? "",
        title: variableDetails?.image?.title ?? "",
        altText: variableDetails?.image?.altText ?? "",
      };
      product.stockQuantity = variableDetails?.stockQuantity ?? 0;
      // handle attributes
      product.attributesString = "";
      const attributes = productData?.variation?.attributes ?? [];
      for (let i = 0; i < attributes.length; i++) {
        if (i === 0) product.attributesString += attributes[i].value;
        else product.attributesString += " / " + attributes[i].value;
      }
    }
    formattedCart.products.push(product);
    // bundle proudct
  }

  // handle chosenShippingMethods
  formattedCart.chosenShippingMethods = getChosenShippingMethods(cartData);

  // handle availableShippingMethods
  formattedCart.availableShippingMethods =
    getFormattedShippingMethods(cartData);
  return formattedCart;
};

export const getChosenShippingMethods = (data: any) => {
  const chosenShippingMethods = "";
  if (data === undefined || data.chosenShippingMethods.length === 0) {
    return chosenShippingMethods;
  }
  return data.chosenShippingMethods[0];
};
export const getFormattedShippingMethods = (data: any) => {
  let formattedShippingMethods: any = [];
  if (data === undefined || data.availableShippingMethods === undefined) {
    return formattedShippingMethods;
  }
  formattedShippingMethods = data.availableShippingMethods[0]?.rates;
  return formattedShippingMethods;
};
