import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

type IProps = {
  user: string;
  message?: {
    text?: string;
    timestamp?: Timestamp;
  };
};
export default function Message({ user, message }: IProps) {
  const [loggedInUser] = useAuthState(auth);

  return (
    <div className={`messageElement ${loggedInUser?.email === user ? 'sender' : 'receiver'}`}>
      <p>
        {message?.text}
        <span className="text-[9px] text-gray-500 p-3 absolute bottom-0 right-0 text-right">{message?.timestamp ? moment(message.timestamp).format('LT') : '...'}</span>
      </p>
    </div>
  );
}
