import React from 'react';
import Image from 'next/image';
import { Circles } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Loading() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col items-center">
        <div className="relative mb-10 flex h-[200px] w-[200px] items-center">
          <Image src="/WhatsAppLogo.png" alt="WhatsApp Logo" objectFit="contain" layout="fill" priority />
        </div>
        <Circles color="#3CBC28" height={100} width={100} />
      </div>
    </div>
  );
}
