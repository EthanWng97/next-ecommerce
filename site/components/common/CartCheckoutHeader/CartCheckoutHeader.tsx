import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/solid";

const CartCheckoutHeader = ({ currentStatus }: { currentStatus: string }) => {
  const initStepValue = [
    { name: "Cart", href: "/cart", status: "current" },
    { name: "Checkout", href: "/checkout", status: "upcoming" },
    { name: "Confirmation", href: "/complete", status: "upcoming" },
  ];

  const [steps, setSteps] = useState(initStepValue);

  useEffect(() => {
    setSteps(
      steps.map((step) =>
        step.name === currentStatus
          ? { ...step, status: "current" }
          : { ...step, status: "non-current" }
      )
    );
  }, [currentStatus]);

  return (
    <header className="relative border-b border-gray-200 bg-white text-sm font-medium text-gray-700">
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-end sm:justify-center">
          <a href="#" className="absolute left-0 top-1/2 -mt-4">
            <span className="sr-only">Workflow</span>
            <img
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt=""
              className="h-8 w-auto"
            />
          </a>
          <nav aria-label="Progress" className="hidden sm:block">
            <ol role="list" className="flex space-x-4">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="flex items-center">
                  <Link href={step.href}>
                    {step.status === "current" ? (
                      <a aria-current="page" className="text-indigo-600">
                        {step.name}
                      </a>
                    ) : (
                      <a>{step.name}</a>
                    )}
                  </Link>

                  {stepIdx !== steps.length - 1 ? (
                    <ChevronRightIcon
                      className="ml-4 h-5 w-5 text-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
          <p className="sm:hidden">Step 2 of 4</p>
        </div>
      </div>
    </header>
  );
};

export default CartCheckoutHeader;
