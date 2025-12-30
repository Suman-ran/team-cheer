import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vote, TeamRanking, teams } from '@/data/teams';

interface VoteStore {
  votes: Vote[];
  addVote: (voterName: string, teamIds: string[]) => boolean;
  getRankings: () => TeamRanking[];
  hasVoted: (voterName: string) => boolean;
  getTotalVotes: () => number;
}

export const useVoteStore = create<VoteStore>()(
  persist(
    (set, get) => ({
      votes: [],
      
      addVote: (voterName: string, teamIds: string[]) => {
        const normalizedName = voterName.trim().toLowerCase();
        
        // Check if user already voted
        if (get().votes.some(v => v.voterName.toLowerCase() === normalizedName)) {
          return false;
        }
        
        const newVote: Vote = {
          id: crypto.randomUUID(),
          voterName: voterName.trim(),
          teamIds,
          timestamp: new Date(),
        };
        
        set((state) => ({
          votes: [...state.votes, newVote],
        }));
        
        return true;
      },
      
      getRankings: () => {
        const votes = get().votes;
        const voteCounts: Record<string, number> = {};
        
        // Count votes for each team
        votes.forEach((vote) => {
          vote.teamIds.forEach((teamId) => {
            voteCounts[teamId] = (voteCounts[teamId] || 0) + 1;
          });
        });
        
        // Create rankings
        const rankings: TeamRanking[] = teams.map((team) => ({
          team,
          voteCount: voteCounts[team.id] || 0,
          rank: 0,
        }));
        
        // Sort by vote count (descending)
        rankings.sort((a, b) => b.voteCount - a.voteCount);
        
        // Assign ranks (handling ties)
        let currentRank = 1;
        rankings.forEach((ranking, index) => {
          if (index > 0 && ranking.voteCount < rankings[index - 1].voteCount) {
            currentRank = index + 1;
          }
          ranking.rank = currentRank;
        });
        
        return rankings;
      },
      
      hasVoted: (voterName: string) => {
        return get().votes.some(
          (v) => v.voterName.toLowerCase() === voterName.trim().toLowerCase()
        );
      },
      
      getTotalVotes: () => get().votes.length,
    }),
    {
      name: 'team-votes',
    }
  )
);
