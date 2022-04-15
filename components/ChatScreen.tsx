import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, chats_url, db, messages_url } from '../firebase';
import { PaperClipIcon, DotsVerticalIcon, EmojiHappyIcon, MicrophoneIcon } from '@heroicons/react/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);
  // const submitMessageButton = useRef(null);
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

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('message sent');
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
          <h3 className="mb-1 font-semibold">Received Email</h3>
          <p className="text-sm text-gray-500">Last seen ...</p>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <PaperClipIcon className="h-6" />
          <DotsVerticalIcon className="h-6" />
        </div>
      </header>

      {/* show messages */}
      <div className="min-h-[90vh] bg-[#e5ded8] p-8">
        {showMessages()}
        <div id="end-of-messages"></div>
      </div>

      {/* Chat Input Message Box */}
      <form className="z-100 sticky bottom-0 flex items-center bg-white p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          className="sticky bottom-0 mx-4 flex-1 rounded-xl border-none bg-[#f5f5f5] p-5 outline-none focus:ring-0"
          type="text"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button disabled={!input} onClick={sendMessage} hidden type="submit">
          Send Message
        </button>
        <MicrophoneIcon className="h-7" />
      </form>
    </section>
  );
}
