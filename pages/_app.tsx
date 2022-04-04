import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function MyApp({ Component, pageProps }: AppProps) {

  const [user] = useAuthState(auth);

  if (!user) return <Login/>


  return <Component {...pageProps} />;
}

export default MyApp;
