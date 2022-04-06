import { signOut as signOutFromProvider, UserInfo } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as EmailValidator from 'email-validator';
import { DotsVerticalIcon, AnnotationIcon, SearchIcon } from '@heroicons/react/solid';
import { auth, chats_url, db } from '../firebase';

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const chatsCollectionRef = collection(db, chats_url);
  const userChatQuery = query(chatsCollectionRef, where('users', 'array-contains', user?.email));
  const [chatsSnapshot] = useCollection(userChatQuery);

  /** Does Chat Already Exists?
   * Check 'users' array found within 'useCollection' snapshot to find if 'yourEmail' already exists. If it does, then a chat already exists so don't create a new one.
   * @param yourEmail
   * @returns Boolean
   */
  const chatAlreadyExists = (yourEmail: string) =>
    !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((email: string) => email === yourEmail)?.length > 0);

  const signOut = () => {
    signOutFromProvider(auth);
  };

  /**
   * In Firestore, we have 'chats' Collection
   * Each Document in the 'chats' Collection will represent a one-to-one chat between registered users.
   * Each Document will contain an array of 'users' participating in this particular chat.
   * The 'logged-in-user' is the first element of that 'users' Array.
   * The second element will be the result from our input popup box asking for email of user to chat with
   * @returns
   */
  const handleCreateChat = () => {
    if (!user) return;

    const input = prompt('Please enter email address for the user you wish to chat with');

    if (!input || !input.trim()) return;

    const myEmail = user.email as string;
    const yourEmail = input.trim();

    if (!okayToCreateChat(myEmail, yourEmail)) return;

    // All Checks pass... create a new chat!
    createChat(myEmail, yourEmail);
  };

  const createChat = async (myEmail: string, yourEmail: string) => {
    const docRef = await addDoc(chatsCollectionRef, {
      users: [myEmail, yourEmail],
    });
  };

  /** Validation - okayToCreateChat */
  const okayToCreateChat = (myEmail: string, yourEmail: string) => {
    let message = '';
    // is email valid?
    if (!EmailValidator.validate(yourEmail) || myEmail === yourEmail) {
      message = 'Email not valid';
    }

    // TODO: does 'yourEmail' exist as a 'registered user'?

    // does chat already exist?
    if (chatAlreadyExists(yourEmail)) {
      message = 'Chat already exists';
    }

    // TODO: handle error message
    return !!message;
  };

  // const postChatMessage = async () => {
  //   const messageToAdd:IChatMessage = {

  //   };
  //   const docRef = await addDoc(chatsCollectionRef,messageToAdd);

  // };

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
        <button
          className="w-full border-y bg-white py-4 font-semibold uppercase"
          type="button"
          onClick={handleCreateChat}
        >
          Start a new chat
        </button>
      </div>

      <div>{/* list of chats */}</div>
    </section>
  );
}
