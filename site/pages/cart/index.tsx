import Layout from "@components/common/Layout";
import RelatedItems from "@components/cart/RelatedItems";
import CartCheckoutHeader from "@components/common/CartCheckoutHeader";
import CartTotals from "@components/cart/CartTotals";
import CartItems from "@components/cart/CartItems";
import CartContainer from "@components/cart";

const Cart = () => {
  const currentStatus = "Cart";

  return (
    <Layout>
      {/* CartItemsContainer */}
      <div className="bg-white">
        <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <CartCheckoutHeader currentStatus={currentStatus} />
          <CartContainer />
        </main>
      </div>
    </Layout>
  );
};

export default Cart;
