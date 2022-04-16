import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, chats_url, db, messages_url, users_url } from '../firebase';
import { PaperClipIcon, DotsVerticalIcon, EmojiHappyIcon, MicrophoneIcon } from '@heroicons/react/outline';
import { addDoc, collection, doc, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import { getRecipientEmail } from '../lib/utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

type IProps = {
  messages: any;
  chat: { id: string; users: string[] };
};

export default function ChatScreen({ chat, messages }: IProps) {
  const endOfMessagesRef = useRef(null);
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);
  const router = useRouter();
  const chatId = router.query.id as string;
  const recipientEmail = getRecipientEmail(chat.users, user?.email as string);
  // Messages Snapshot
  const messagesCollectionRef = collection(db, chats_url, chatId, messages_url);
  const messagesQuery = query(messagesCollectionRef, orderBy('timestamp', 'asc'));
  const [messagesSnapshot] = useCollection(messagesQuery);
  // Recipients Snapshot
  const usersCollectionRef = collection(db, users_url);
  const usersQuery = query(usersCollectionRef, where('email', '==', recipientEmail));
  const [recipientSnapshot] = useCollection(usersQuery);
  const recipient = recipientSnapshot?.docs[0]?.data();

  // Show Messages from Firestore DB
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
    } else {
      return JSON.parse(messages).map((message: any) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };
  // Send New Message to Firestore DB
  const sendMessage = (e: any) => {
    e.preventDefault();

    const userId = user?.uid as string;
    const email = user?.email as string;
    const photoURL = user?.photoURL as string;

    try {
      // update last seen date|time
      updateDoc(doc(usersCollectionRef, userId), {
        lastSeen: serverTimestamp(),
      });

      addDoc(messagesCollectionRef, {
        timestamp: serverTimestamp(),
        text: input,
        user: email,
        photoURL: photoURL,
      });

      setInput('');
      scrollToBottom();
    } catch (error) {
      console.log('ChatScreen | send message failed', error);
    }
  };
  // Automatically Scroll to last Chat Message
  const scrollToBottom = () => {
    const endOfMessages: HTMLElement = endOfMessagesRef && endOfMessagesRef.current!;
    endOfMessages.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="z-100 sticky top-0 flex-1 bg-[#f5f5f5]">
      <header className="flex h-20 items-center border-b border-[#f5f5f5] bg-white p-4">
        {recipient && recipient.photoURL ? (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={recipient.photoURL} alt="user avatar" className="h-10 w-10 cursor-pointer rounded-full" />
          </div>
        ) : (
          <div className="m-2 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white">
            <p className="text-sm uppercase">{recipientEmail[0]}</p>
          </div>
        )}
        <div className="ml-4 flex-1">
          <h3 className="mb-1 font-semibold">{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p className="text-xs text-gray-500">
              Last active: {recipient?.lastSeen ? <TimeAgo datetime={recipient?.lastSeen?.toDate()} /> : 'unavailable'}
            </p>
          ) : (
            <p className="text-xs text-gray-500">Loading last active...</p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4">
          <PaperClipIcon className="h-6" />
          <DotsVerticalIcon className="h-6" />
        </div>
      </header>

      {/* show messages */}
      <div className="min-h-[90vh] bg-[#e5ded8] p-8">
        {showMessages()}
        <div className="mb-14 " ref={endOfMessagesRef}></div>
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
    </div>
  );
}
