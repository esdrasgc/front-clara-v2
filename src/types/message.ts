export interface IBaseMessage {
  sentTime: string;
  type: 'system' | 'chat';
  direction: 'incoming' | 'outgoing'; 
}

export interface ISystemMessage extends IBaseMessage {
  content: string;
}

export interface IChatMessage extends IBaseMessage {
  message: string;
  sender: 'ChatGPT' | 'user'; 
  gpt_response?: {
    role: string;
    content: string;
    status: string;
  };
}

export type IMessage = ISystemMessage | IChatMessage;
