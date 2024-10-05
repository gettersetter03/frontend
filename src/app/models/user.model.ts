export interface User {
    username: string;
    type: 's' | 'm' | 'x';  // The user type
    enabled: boolean;
    lastLogonTime: Date;
  }  