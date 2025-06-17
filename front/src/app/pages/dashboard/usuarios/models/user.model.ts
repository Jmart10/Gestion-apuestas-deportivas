
export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastPayment?: {
    date: Date;
    amount: number;
  };
  betsCreated: number;
  avatar?: string;
}