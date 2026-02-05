export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: string; // Optional field to demonstrate extensibility usage later if needed
  createdAt: string;
}

export type UserFormData = Omit<User, 'id' | 'createdAt'>;
