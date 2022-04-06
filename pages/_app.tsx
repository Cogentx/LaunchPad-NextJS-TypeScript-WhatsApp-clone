import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Signin from './auth/signin';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }: AppProps) {

  const [user, loading] = useAuthState(auth);

  if (true) return <Loading/>;
  if (!user) return <Signin/>

  return <Component {...pageProps} />;
}

export default MyApp;
