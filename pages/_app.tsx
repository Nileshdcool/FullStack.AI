// src/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Provider } from "react-redux";
import store from "@/stores";
import { AppProvider } from "@/context/AppContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for the ToastContainer

const Publishablekey = 'pk_test_51Q5Q6hEPlpUlyxSsOXz09CxsZfdFImTmN9OsYP0qJwrB82zQJt3AsyOWWGorCWsFVnPsh432NZrFLQsIm5LNBU0k004XFlpD24';

// Load your Stripe public key
const stripePromise = loadStripe(Publishablekey); // Replace with your actual Stripe public key

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppProvider>
          <Elements stripe={stripePromise}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer /> {/* Add ToastContainer here */}
            </Layout>
          </Elements>
        </AppProvider>
      </Provider>
    </ErrorBoundary>
  );
}
