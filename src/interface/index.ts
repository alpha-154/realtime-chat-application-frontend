// Group Interface for Frontend Use


export interface ISearchGroup {
    groupName: string;
  }


export interface IGroup {
    groupName: string;
    members: string[];           // Array of User IDs as strings
    admin: string;               // Admin ID as a string
    messageList: string[];       // Array of Message IDs as strings
    createdAt?: Date;            // Date of creation
  }

export interface INotification {
  userName: string;
  profileImage: string;
}

export interface SearchUser {
  userName: string;
  profileImage: string;
}

export interface connectedUsers {
  userName: string;
  profileImage: string;
  privateMessageId: string;
}

export interface Message {
  from: string;
  to: string;
  content: string;
  isGroupMsg: boolean;
 // groupMsgIdentifier?: string;
  privateMsgIdentifier?: string;
  createdAt: string;
}

export interface selectedUsersProps {
  currentUser: string;
  chatWithUser: string;
  privateMessageId: string;
}