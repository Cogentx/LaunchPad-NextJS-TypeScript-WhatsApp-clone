import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, chats_url, db, messages_url } from '../firebase';
import { PaperClipIcon, DotsVerticalIcon, EmojiHappyIcon, PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';

export default function ChatScreen() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const chatId = router.query.id as string;
  const messagesCollectionRef = collection(db, chats_url, chatId, messages_url);
  const messagesQuery = query(messagesCollectionRef, orderBy('timestamp', 'desc'));
  const [messagesSnapshot] = useCollection(messagesQuery);

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };

  return (
    <section className="z-100 sticky top-0 flex-1 bg-[#f5f5f5]">
      <header className="flex h-20 items-center border-b border-[#f5f5f5] bg-white p-4">
        {user && user.photoURL && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.photoURL} alt="user avatar" className="h-10 w-10 cursor-pointer rounded-full" />
          </div>
        )}
        <div className="ml-4 flex-1">
          <h3 className="mb-1 text-sm font-semibold">Received Email</h3>
          <p className="text-xs">Last seen ...</p>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <PaperClipIcon className="h-6" />
          <DotsVerticalIcon className="h-6" />
        </div>
      </header>

        {/* show messages */}
      <div className="p-8 bg-[#e5ded8] min-h-[90vh]">
        <div></div>
      </div>

      {/* Chat Input Message Box */}
      <form className="flex items-center p-4 sticky bg-white bottom-0 z-100">
        <EmojiHappyIcon className="h-7"/>
        <input className="flex-1 border-none outline-none focus:ring-0 rounded-xl p-5 mx-4 sticky bottom-0 bg-[#f5f5f5]" type="text" placeholder="Message..." />
        <button type="submit">
          <MicrophoneIcon className="h-7"/>
          {/* <PaperAirplaneIcon className="h-7 rotate-90"/> */}
        </button>
      </form>
    </section>
  );
}
