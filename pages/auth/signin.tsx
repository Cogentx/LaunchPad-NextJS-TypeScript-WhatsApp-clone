import Head from 'next/head';
import Image from 'next/image';

export default function Signin() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main className="mt-20 flex min-h-screen flex-col items-center py-2 px-14">
        {/* Logo */}
        <section className="relative flex h-[200px] w-[200px] items-center">
          <Image src="/WhatsAppLogo.png" alt="WhatsApp Logo" layout="fill" objectFit="contain" priority />
        </section>

        {/* Message */}
        <section></section>

        {/* Signin Button */}
        <section>
          <button className="font-semibold uppercase">Sign in with Google</button>
        </section>
      </main>
    </>
  );
}
