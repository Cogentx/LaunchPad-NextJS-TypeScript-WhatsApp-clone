import Head from 'next/head';
import Image from 'next/image';
import { signInWithPopup } from 'firebase/auth';
import { auth, authProviderGoogle } from '../../firebase';

export default function Signin() {
  const signIn = async () => {
    try {
      signInWithPopup(auth, authProviderGoogle);
    } catch (error) {
      console.log('Error signing in...', error);
    }
  };

  return (
    <section className="grid h-screen place-items-center bg-[#f5f5f5]">
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex flex-col items-center rounded-lg border bg-white p-[100px] shadow-lg">
        {/* Logo */}
        <div className="relative mb-12 flex h-[200px] w-[200px] items-center justify-center">
          <Image src="/WhatsAppLogo.png" alt="WhatsApp Logo" layout="fill" objectFit="contain" priority />
        </div>

        {/* Message */}
        <p className="font-xs italic mb-12">WhatsApp Clone built for Educational Purposes Only</p>

        {/* Signin Button */}
        <div>
          <button onClick={signIn} className="rounded-lg border p-3 font-semibold uppercase text-black">
            Sign in with Google
          </button>
        </div>
      </div>
    </section>
  );
}
