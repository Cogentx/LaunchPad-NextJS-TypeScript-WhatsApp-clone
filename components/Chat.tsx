import { collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db, users_url } from '../firebase';
import { getRecipientEmail } from '../lib/utils/getRecipientEmail';

type IProps = {
  id: string;
  users: string[];
};

export default function Chat({ id, users }: IProps) {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user?.email as string);

  const recipientQuery = query(collection(db, users_url),where('email',"==",recipientEmail));
  const [recipientSnapshot] = useCollection(recipientQuery);

  const photoURL = recipientSnapshot?.docs.map((user: any) => user.data())[0].photoURL;

  console.log({photoURL});



  return (
    <li>
      <div className="flex cursor-pointer items-center break-words p-4 hover:bg-[#e9eaeb]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoURL}
          alt="Profile Picture"
          className="m-2 mr-4 h-10 w-10 rounded-full"
        />
        <p>{recipientEmail}</p>
      </div>
    </li>
  );
}
