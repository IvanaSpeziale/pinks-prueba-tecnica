import { OrdersProvider } from "@/contexts/Orders.context";
import { RidersProvider } from "@/contexts/Riders.context";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OrdersProvider>
      <RidersProvider>
        <Component {...pageProps} />
      </RidersProvider>
    </OrdersProvider>
  );
}
