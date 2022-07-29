import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Provider from "../app/Provider";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <PayPalScriptProvider options={{ "client-id": "test" }}>
        <Component
          {...pageProps}
        />
      </PayPalScriptProvider>
    </Provider>
  );
}

export default MyApp;
