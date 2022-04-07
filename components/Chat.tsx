import { collection, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db, users_url } from '../firebase';
import { getRecipientEmail } from '../lib/utils/getRecipientEmail';

type IProps = {
  id: string;
  users: string[];
};

export default function Chat({ id, users }: IProps) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user?.email as string);

  const recipientQuery = query(collection(db, users_url), where('email', '==', recipientEmail));
  const [recipientSnapshot] = useCollection(recipientQuery);

  const recipient = recipientSnapshot?.docs.map((user: any) => user.data())[0];

  const enterChat = async () => await router.push(`/chat/${id}`);

  return (
    <li onClick={enterChat}>
      <div className="flex cursor-pointer items-center break-words p-4 hover:bg-[#e9eaeb]">
        {recipient && recipient.photoURL ? (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={recipient.photoURL} alt="Profile Picture" className="m-2 mr-4 h-10 w-10 rounded-full" />
          </div>
        ) : (
          <div className="m-2 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white">
            <p className="text-sm uppercase">{recipientEmail[0]}</p>
          </div>
        )}
        <p>{recipientEmail}</p>
      </div>
    </li>
  );
}
