import { useContext, useEffect, useRef } from "react";

import { UserContext } from "../../contexts/UserContext";
import { getStripe } from "../../utils/getStripe";

import Checkmark from "../../icons/Checkmark";

const PaymentBox = () => {
  const { u } = useContext(UserContext);
  const [user] = u;

  const date365FromExpiry = useRef(new Date());
  const oneDay = 24 * 60 * 60 * 1000;

  useEffect(() => {
    if (user?.proExpiry) {
      let currentDate = new Date(user.proExpiry);
      let date365FromNow = new Date(
        currentDate.setFullYear(currentDate.getFullYear() + 1)
      );

      date365FromExpiry.current = date365FromNow.toISOString().substring(0, 10);
    }
    return () => {
      date365FromExpiry.current = new Date();
    };
  }, [user]);

  const handleCheckout2 = async () => {
    // get the following endpoint
    // " https://generationsapi.herokuapp.com/strapi-stripe/getProduct/1"
    // from the strapi-stripe plugin
    const response = await fetch(
      "https://generationsapi.herokuapp.com/strapi-stripe/getProduct/1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("data", data);
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: "subscription",
      lineItems: [
        {
          price: process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
      // if user is logged in, take email from user
      // customerEmail: user && user?.email ? user.email : "",
    });
    if (error) {
      console.warn("Error:", error);
    }
  };

  return (
    <div className="border-4 border-secondary md:max-w-md mx-auto overflow-hidden rounded-3xl shadow-8xl">
      <div className="p-9">
        <span className="mb-7 inline-block text-sm text-gray-400 font-semibold uppercase tracking-px">
          Features included:
        </span>
        <ul>
          <li className="mb-4 flex items-center">
            <Checkmark />
            <p className="font-semibold leading-normal">
              Peer-to-Peer Learning Forum
            </p>
          </li>
          <li className="mb-4 flex items-center">
            <Checkmark />
            <p className="font-semibold leading-normal">Mentorship Access</p>
          </li>
          <li className="mb-4 flex items-center">
            <Checkmark />
            <p className="font-semibold leading-normal">
              Paid Project Opportunities
            </p>
          </li>
          <li className="mb-4 flex items-center">
            <Checkmark />
            <p className="font-semibold leading-normal">
              1x Round trip to Malang
            </p>
          </li>
          <li className="flex items-center">
            <Checkmark />
            <p className="font-semibold leading-normal">
              Expedited Email Support
            </p>
          </li>
        </ul>
      </div>
      <div className="p-9">
        <div className="flex flex-wrap -m-8 items-center mx-auto">
          <div className="sm:w-1/2 p-4 text-sm md:text-md">
            <span className="mb-2 inline-block text-sm text-gray-400 font-semibold uppercase tracking-px">
              Fellowship Plus
            </span>
            <br />
            <span className="text-white font-semibold leading-normal">
              Unlock all features
            </span>
          </div>
          {/* <div className="w-full sm:w-1/2 p-8"> */}
          <div className="w-1/2 p-4 ">
            <div className="sm:max-w-max ml-auto">
              <p className="font-bold">
                <span className="text-5xl leading-tight tracking-px-n text-secondary">
                  $156
                </span>
                <span className="text-lg text-gray-400 leading-snug tracking-px-n">
                  /yr
                </span>
              </p>
              <p className="font-medium text-gray-400 leading-relaxed text-sm">
                ~$13 per month
              </p>
            </div>
          </div>
        </div>
        <div className="mt-9">
          {user?.proExpiry && new Date(user.proExpiry) > Date.now() ? (
            <>
              <button
                className="py-4 px-5 lg:text-sm w-full text-white font-semibold rounded-xl focus:ring btn-secondary transition ease-in-out duration-200"
                type="button"
                onClick={handleCheckout}
              >
                Extend Fellowship+ to {date365FromExpiry.current.toString()}
              </button>
              <span className="block text-center text-gray-400 text-sm mt-4">
                Your current Fellowship+ expires in{" "}
                {JSON.stringify(
                  Math.round(
                    Math.abs((new Date(user.proExpiry) - Date.now()) / oneDay)
                  )
                )}{" "}
                days
              </span>
            </>
          ) : (
            <button
              className="py-4 px-5 w-full text-white font-semibold rounded-xl focus:ring btn-secondary transition ease-in-out duration-200"
              type="button"
              onClick={handleCheckout2}
            >
              Upgrade to Fellowship+
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentBox;
