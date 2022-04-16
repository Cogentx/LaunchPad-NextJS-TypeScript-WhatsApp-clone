interface IChatMessage {
  id: string;
  user: string;
  message: {
    text: string;
    timestamp: Timestamp;
  };
}

export { IChatMessage };
