import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { Vote, TeamRanking, teams } from '@/data/teams';

interface VoteStore {
  votes: Vote[];
  loading: boolean;
  addVote: (voterName: string, teamIds: string[]) => Promise<boolean>;
  getRankings: () => TeamRanking[];
  hasVoted: (voterName: string) => boolean;
  getTotalVotes: () => number;
  subscribeToVotes: () => () => void;
}

const votesCollection = collection(db, 'votes');

export const useVoteStore = create<VoteStore>()((set, get) => ({
  votes: [],
  loading: true,
  
  addVote: async (voterName: string, teamIds: string[]) => {
    const normalizedName = voterName.trim().toLowerCase();
    
    // Check if user already voted locally first
    if (get().votes.some(v => v.voterName.toLowerCase() === normalizedName)) {
      return false;
    }
    
    // Check in Firestore as well
    const q = query(votesCollection, where('voterNameLower', '==', normalizedName));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return false;
    }
    
    const newVote = {
      voterName: voterName.trim(),
      voterNameLower: normalizedName,
      teamIds,
      timestamp: Timestamp.now(),
    };
    
    try {
      const docRef = await addDoc(votesCollection, newVote);
      
      // Update local state
      set((state) => ({
        votes: [...state.votes, {
          id: docRef.id,
          voterName: voterName.trim(),
          teamIds,
          timestamp: new Date(),
        }],
      }));
      
      return true;
    } catch (error) {
      console.error('Error adding vote:', error);
      return false;
    }
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
  
  subscribeToVotes: () => {
    const unsubscribe = onSnapshot(votesCollection, (snapshot) => {
      const votes: Vote[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        voterName: doc.data().voterName,
        teamIds: doc.data().teamIds,
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      }));
      
      set({ votes, loading: false });
    });
    
    return unsubscribe;
  },
}));
