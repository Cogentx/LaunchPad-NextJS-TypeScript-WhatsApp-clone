import Image from 'next/image';

export default function Loading() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="relative mb-5 flex items-center justify-center h-[200px] w-[200px]">
        <Image
        src="/WhatsAppLogo.png"
        alt="WhatsApp Logo"
        objectFit="contain"
        layout="fill"
        priority
        />
      </div>
    </div>
  );
}
