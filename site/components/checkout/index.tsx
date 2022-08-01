import OrderSummary from "./OrderSummary";
import CheckoutForm from "./CheckoutForm";

const CheckoutContainer = () => {
  return (
    <>
      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>
        <OrderSummary />
        <CheckoutForm />
      </main>
    </>
  );
};

export default CheckoutContainer;
