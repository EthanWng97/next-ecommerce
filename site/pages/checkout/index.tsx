import Layout from "@components/common/Layout";
import CartCheckoutHeader from "@components/common/CartCheckoutHeader";
import CheckoutContainer from "@components/checkout";

const Checkout = () => {
  const currentStatus = "Checkout";
  return (
    <Layout>
      {/* CartItemsContainer */}
      <div className="bg-white">
        <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div
            className="fixed left-0 hidden h-full w-1/2 bg-white lg:block"
            aria-hidden="true"
          />
          <div
            className="fixed right-0 hidden h-full w-1/2 bg-gray-50 lg:block"
            aria-hidden="true"
          />
          <CartCheckoutHeader currentStatus={currentStatus} />
          <CheckoutContainer />
        </main>
      </div>
    </Layout>
  );
};

export default Checkout;
