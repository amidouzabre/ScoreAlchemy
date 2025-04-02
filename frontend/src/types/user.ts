export interface SignUpData {
    username?: string;
    email?: string;
    password?: string;
    // If needed, error information could be handled separately rather than embedded here.
  }
  
  export interface User {
    username: string;
    email: string;
    lastname?: string;
    firstname?: string;
    password: string;
    avatar?: string;
  }
  
  export interface CurrentUser {
    id: string;
    email: string;
    avatar?: string;
    username: string;
    lastname?: string;
    firstname?: string;
  }