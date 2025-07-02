export interface BetHistory {
  id: string;
  match: {
    homeTeam: string;
    awayTeam: string;
    score: string;
    date: Date;
    league: string;
  };
  forecast: {
    type: string;
    selection: string;
    odds: number;
    result: 'won' | 'lost' | 'pending';
  };
  forecaster: {
    id: string;
    name: string;
    avatar?: string;
  };
  followers: number;
  createdAt: Date;
  settledAt?: Date;
}