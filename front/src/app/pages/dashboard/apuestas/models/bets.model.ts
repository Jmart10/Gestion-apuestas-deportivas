export interface Bet {
  id?: string;
  _id?: string;
  matches: {
    homeTeam: string;
    awayTeam: string;
    date: Date;
    league: string;
    status?: string; // 'winning' | 'losing' | 'pending' | 'cancelled';
    history: {
      lastMatches: {
        teams: string;
        result: string;
        date: Date;
      }[];
      h2h: {
        homeWins: number;
        awayWins: number;
        draws: number;
      };
    };
    forecast: {
      type: '1X2' | 'Over/Under' | 'Handicap';
      selection: string;
      odds: number;
    };
  }[]; // 👈 Array de partidos

  forecaster: {
    id: string;
    name: string;
    avatar?: string;
    stats: {
      successRate: number;
      last10: number[];
      yield: number;
    };
  };
  price: number;
  createdAt: Date;
  followers?: number;

}
