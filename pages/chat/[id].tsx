import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { auth, chats_url, db, messages_url, users_url } from '../../firebase';
import { getRecipientEmail } from '../../lib/utils/getRecipientEmail';

type IProps = {
  messages: any;
  chat: { id: string; users: string[] };
};

export default function ChatPage({ messages, chat }: IProps) {
  console.log(JSON.parse(messages));
  console.log(chat);
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(chat.users,user?.email as string);

  return (
    <div className="flex">
      <Head>
        <title>Chat with {recipientEmail}</title>
      </Head>

      <Sidebar />
      <ChatScreen />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chatId = context.query.id as string;
  const messagesCollectionRef = collection(db, users_url, chatId, messages_url);
  const messagesQuery = query(messagesCollectionRef, orderBy('timestamp', 'desc'));

  // PREP the messages on the server
  const messagesResponse = await getDocs(messagesQuery);
  const messages = messagesResponse.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages: { id: string; timestamp?: any }) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // PREP the chats
  const chatDocRef = doc(db, chats_url, chatId);
  const chatResponse = await getDoc(chatDocRef);
  const chat = {
    id: chatResponse.id,
    ...chatResponse.data(),
  };

  console.log(chat, messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
};
