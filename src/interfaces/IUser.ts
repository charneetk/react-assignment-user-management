interface Address {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  }
  
  interface Company {
    name?: string;
    title?: string;
    department?: string;
    address?: Address;
  }
  
  export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    maidenName?: string;
    password:string;
    age?: number;
    gender?: string;
    email: string;
    phone?: string;
    username: string;
    birthDate?: string;
    image?: string;
    address?: Address;
    university?: string;
    company?: Company;
    role?: 'admin' | 'moderator' | 'user';
  }
  