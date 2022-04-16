import { Timestamp } from 'firebase/firestore';

type IProps = {
  user: string;
  message?: {
    text?: string;
    timestamp?: Timestamp;
  };
};
export default function Message({ user, message }: IProps) {
  return (
    <div>
      <p>{user}</p>
      <p>{message?.text}</p>
    </div>
  );
}
