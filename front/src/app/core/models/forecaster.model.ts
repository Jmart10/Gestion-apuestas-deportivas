export interface Forecaster {
  id?: string;
  name: string;
  telegramChannel: string;
  sport: string[];
  isPremium: boolean;
  status: 'activo' | 'inactivo';
  createdAt?: Date;
}
