import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { getRecipientEmail } from '../lib/utils/getRecipientEmail';

type IProps = {
  id: string;
  users: string[];
};

export default function Chat({ id, users }: IProps) {
  const [user] = useAuthState(auth);

  const recipientEmail = getRecipientEmail(users, user?.email as string);

  return (
    <li>
      <div className="flex cursor-pointer items-center break-words p-4 hover:bg-[#e9eaeb]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://avatars.githubusercontent.com/u/48112040?s=96&v=4"
          alt="Profile Picture"
          className="m-2 mr-4 h-10 w-10 rounded-full"
        />
        <p>{recipientEmail}</p>
      </div>
    </li>
  );
}
