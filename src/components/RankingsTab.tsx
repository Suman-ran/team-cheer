import { useVoteStore } from '@/store/voteStore';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RankingsTab() {
  const { getRankings, getTotalVotes } = useVoteStore();
  const rankings = getRankings();
  const totalVotes = getTotalVotes();
  
  const maxVotes = rankings[0]?.voteCount || 1;
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-silver" />;
      case 3:
        return <Award className="w-6 h-6 text-bronze" />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-gold/50 bg-gold/5";
      case 2:
        return "border-silver/50 bg-silver/5";
      case 3:
        return "border-bronze/50 bg-bronze/5";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-3">
          Team Rankings
        </h2>
        <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Based on <span className="text-primary font-semibold">{totalVotes}</span> total votes
        </p>
      </div>

      {totalVotes === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-display text-foreground mb-2">No Votes Yet</h3>
          <p className="text-muted-foreground">
            Be the first to vote and see the rankings!
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-w-4xl mx-auto">
          {rankings.map((ranking, index) => {
            const barWidth = ranking.voteCount > 0 
              ? (ranking.voteCount / maxVotes) * 100 
              : 0;
            
            return (
              <div
                key={ranking.team.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg border transition-all",
                  getRankStyle(ranking.rank),
                  "hover:shadow-card"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Rank number */}
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center font-display text-xl flex-shrink-0",
                  ranking.rank === 1 && "gradient-gold text-accent-foreground",
                  ranking.rank === 2 && "bg-silver text-accent-foreground",
                  ranking.rank === 3 && "bg-bronze text-accent-foreground",
                  ranking.rank > 3 && "bg-secondary text-muted-foreground"
                )}>
                  {ranking.rank}
                </div>

                {/* Team info and bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getRankIcon(ranking.rank)}
                    <h3 className="font-semibold text-foreground truncate">
                      {ranking.team.name}
                    </h3>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700 ease-out",
                        ranking.rank === 1 && "gradient-gold",
                        ranking.rank === 2 && "bg-silver",
                        ranking.rank === 3 && "bg-bronze",
                        ranking.rank > 3 && "gradient-primary"
                      )}
                      style={{ 
                        width: `${barWidth}%`,
                        transitionDelay: `${index * 50}ms`
                      }}
                    />
                  </div>
                </div>

                {/* Vote count */}
                <div className="text-right flex-shrink-0">
                  <div className={cn(
                    "text-2xl font-display",
                    ranking.rank === 1 && "text-gold",
                    ranking.rank === 2 && "text-silver",
                    ranking.rank === 3 && "text-bronze",
                    ranking.rank > 3 && "text-foreground"
                  )}>
                    {ranking.voteCount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {ranking.voteCount === 1 ? 'vote' : 'votes'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
