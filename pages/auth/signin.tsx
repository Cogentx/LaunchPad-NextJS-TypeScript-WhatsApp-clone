import Head from 'next/head';
import Image from 'next/image';

export default function Signin() {
  return (
    <section className="grid h-screen place-items-center bg-[#f5f5f5]">
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex flex-col items-center bg-white p-[100px] border rounded-lg shadow-lg">
        {/* Logo */}
        <div className="relative mb-12 flex h-[200px] w-[200px] items-center justify-center">
          <Image src="/WhatsAppLogo.png" alt="WhatsApp Logo" layout="fill" objectFit="contain" priority />
        </div>

        {/* Message */}
        <p className="font-xs italic">
          WhatsApp Clone built for Educational Purposes Only
        </p>

        {/* Signin Button */}
        <div>
          <button className="rounded-lg p-3 font-semibold uppercase text-black border">
            Sign in with Google
          </button>
        </div>
      </div>
    </section>
  );
}
