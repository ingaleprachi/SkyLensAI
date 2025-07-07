import "@/styles/globals.css";
import 'leaflet/dist/leaflet.css'; // 📍 Add this line at the top

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
