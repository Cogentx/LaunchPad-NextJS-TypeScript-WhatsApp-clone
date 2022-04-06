import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import type { UserInfo } from '@firebase/auth-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, users_url } from '../firebase';
import Signin from './auth/signin';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  const usersCollectionRef = collection(db, users_url);

  const handleSetUserData = () => {
    if (user) {
      const localUser: UserInfo = user;
      setUserData(localUser);
    }
  };

  const setUserData = async ({uid, email, photoURL}: UserInfo) => {

    const userDocRef = doc(usersCollectionRef, uid);
    try {
      await setDoc(userDocRef, {
        email,
        photoURL,
        lastSeen: serverTimestamp(),
      },{
        merge: true,
      });
    } catch (error) {
      console.log('Error setting user data', error);
    }
  };

  // capture 'user' detail the first time they sign in and any time 'user' changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleSetUserData(), [user]);

  if (loading) return <Loading />;
  if (!user) return <Signin />;

  return <Component {...pageProps} />;
}

export default MyApp;
