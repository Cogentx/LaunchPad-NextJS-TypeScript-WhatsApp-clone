import Head from 'next/head';
import Image from 'next/image';

export default function Signin() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main>
        {/* Logo */}
        <section className="flex flex-col">
          <Image src="/WhatsAppLogo.png" alt="Company Logo" width={200} height={200} layout="fixed" className="" />
          <button className="">Sign in with Google</button>
        </section>

        {/* Message */}
        <section></section>

        {/* Signin Button */}
        <section></section>
      </main>
    </>
  );
}
