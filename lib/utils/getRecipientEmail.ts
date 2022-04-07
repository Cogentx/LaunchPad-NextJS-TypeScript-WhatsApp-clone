type IGetRecipientEmail = (users:string[], loggedInUserEmail:string) => string;

const getRecipientEmail: IGetRecipientEmail = (users, loggedInUserEmail) => users?.filter((email: string)=> email !== loggedInUserEmail)[0];

export {getRecipientEmail}
