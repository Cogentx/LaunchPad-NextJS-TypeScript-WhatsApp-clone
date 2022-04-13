import { FieldValue, Timestamp } from "firebase/firestore";

type IProps = {
  user:string;
  message?:{
    message?:string;
    timestamp?:Timestamp;
  }
}
export default function Message({user, message}:IProps) {
  console.log({user, message});

  return (
    <div><p>{user}</p></div>
  )
}
