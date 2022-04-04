import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Signin from './auth/signin';

function MyApp({ Component, pageProps }: AppProps) {

  const [user] = useAuthState(auth);

  if (!user) return <Signin/>


  return <Component {...pageProps} />;
}

export default MyApp;
