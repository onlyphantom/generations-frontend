import { loadStripe } from "@stripe/stripe-js";

export async function getStripe() {
    console.log(process.env.REACT_APP_PUBLIC_STRIPE_PUBLIC_KEY);
    const stripeJs = await loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_PUBLIC_KEY);
    return stripeJs;
}
