export interface SignUpData {
    username?: string;
    email?: string;
    password?: string;
    // If needed, error information could be handled separately rather than embedded here.
  }
  
  export interface User {
    username: string;
    email: string;
    password: string;
  }
  
  export interface CurrentUser {
    id: string;
    email: string;
  }