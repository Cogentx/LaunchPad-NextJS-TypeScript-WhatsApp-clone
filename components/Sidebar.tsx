import { signOut as signOutFromProvider } from 'firebase/auth';
import { DotsVerticalIcon, AnnotationIcon, SearchIcon } from '@heroicons/react/solid';
import * as EmailValidator from 'email-validator';
import { auth } from '../firebase';

export default function Sidebar() {
  const createChat = () => {
    const input = prompt('Please enter email address for the user you wish to chat with');

    if (!input || !input.trim()) return null;

    if (EmailValidator.validate(input)) {
      // add chat in to the DB 'wa-chat' collection
    }
  };

  const signOut = () => {
    signOutFromProvider(auth);
  };

  return (
    <section className="sticky top-0 z-50 border-b bg-[#f5f5f5] shadow-sm">
      <header className="flex h-14 items-center justify-between p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          onClick={signOut}
          src="https://avatars.githubusercontent.com/u/48112040?s=96&v=4"
          alt="Profile Picture"
          className="h-10 w-10 cursor-pointer rounded-full border-[2px]"
        />
        <div className="flex items-center justify-end space-x-4">
          <AnnotationIcon className="sbBtn" />
          <DotsVerticalIcon className="sbBtn" />
        </div>
      </header>

      <div className="flex-1">
        <div className="relative mt-1 rounded-md p-3">
          <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
            <SearchIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button className="w-full border-y bg-white py-4 font-semibold uppercase" type="button" onClick={createChat}>
          Start a new chat
        </button>
      </div>

      <div>{/* list of chats */}</div>
    </section>
  );
}
