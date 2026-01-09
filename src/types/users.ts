export type UserRole = 
  | 'ADMIN' 
  | 'SUPER_ADMIN' 
  | 'CUSTOMER' 
  

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};
