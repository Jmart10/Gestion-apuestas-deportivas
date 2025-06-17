
export type BetResult = 'won' | 'lost' | 'pending';

export interface Bet {
  title: string;
  date: Date;
  result: BetResult;
  amount: number;
}