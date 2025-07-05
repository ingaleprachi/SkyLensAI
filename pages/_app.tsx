import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';



const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }, []);
  return <Component {...pageProps} />;
}
