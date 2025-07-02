export interface Bet {
  id?: string;
  _id?: string;
  userId: string;

  matches: {
    homeTeam: string;
    awayTeam: string;
    date: Date;
    league: string;
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
  }[];

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
  status?: string;
  createdAt: Date;
  followers?: number;

}
