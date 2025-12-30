import { useState, useEffect } from 'react';
import { teams } from '@/data/teams';
import { useVoteStore } from '@/store/voteStore';
import { TeamCard } from './TeamCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Vote, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const MAX_SELECTIONS = 3;

export function VotingTab() {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [voterName, setVoterName] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addVote, hasVoted, getTotalVotes, subscribeToVotes, loading } = useVoteStore();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = subscribeToVotes();
    return () => unsubscribe();
  }, [subscribeToVotes]);

  const handleTeamToggle = (teamId: string) => {
    setSelectedTeams((prev) => {
      if (prev.includes(teamId)) {
        return prev.filter((id) => id !== teamId);
      }
      if (prev.length >= MAX_SELECTIONS) {
        toast({
          title: "Maximum selections reached",
          description: `You can only select up to ${MAX_SELECTIONS} teams.`,
          variant: "destructive",
        });
        return prev;
      }
      return [...prev, teamId];
    });
  };

  const handleSubmit = async () => {
    if (!voterName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to vote.",
        variant: "destructive",
      });
      return;
    }

    if (selectedTeams.length === 0) {
      toast({
        title: "No teams selected",
        description: "Please select at least one team to vote.",
        variant: "destructive",
      });
      return;
    }

    if (hasVoted(voterName)) {
      toast({
        title: "Already voted",
        description: "You have already submitted a vote with this name.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await addVote(voterName, selectedTeams);
      
      if (success) {
        setHasSubmitted(true);
        toast({
          title: "Vote submitted!",
          description: `Thank you ${voterName}! Your vote has been recorded.`,
        });
      } else {
        toast({
          title: "Already voted",
          description: "You have already submitted a vote with this name.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-muted-foreground mt-4">Loading...</p>
      </div>
    );
  }

  if (hasSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-6 animate-pulse-glow">
          <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-4xl font-display text-foreground mb-3">Vote Submitted!</h2>
        <p className="text-muted-foreground text-lg mb-6">
          Thank you for participating, {voterName}!
        </p>
        <p className="text-sm text-muted-foreground">
          Check the Rankings tab to see how your teams are doing.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-3">
          Vote for Your Favorites
        </h2>
        <p className="text-muted-foreground text-lg">
          Select up to <span className="text-primary font-semibold">{MAX_SELECTIONS} teams</span> you want to support
        </p>
      </div>

      {/* Voter name input */}
      <div className="max-w-md mx-auto mb-8">
        <label htmlFor="voterName" className="block text-sm font-medium text-muted-foreground mb-2">
          Your Name
        </label>
        <Input
          id="voterName"
          type="text"
          placeholder="Enter your name..."
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          className="bg-secondary border-border focus:border-primary"
        />
      </div>

      {/* Selection counter */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex gap-1">
          {[...Array(MAX_SELECTIONS)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < selectedTeams.length
                  ? 'gradient-primary shadow-glow'
                  : 'bg-secondary'
              }`}
            />
          ))}
        </div>
        <span className="text-muted-foreground text-sm">
          {selectedTeams.length} / {MAX_SELECTIONS} selected
        </span>
      </div>

      {/* Teams grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            isSelected={selectedTeams.includes(team.id)}
            onToggle={() => handleTeamToggle(team.id)}
            disabled={selectedTeams.length >= MAX_SELECTIONS}
            selectionNumber={
              selectedTeams.includes(team.id)
                ? selectedTeams.indexOf(team.id) + 1
                : undefined
            }
          />
        ))}
      </div>

      {/* Submit button */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleSubmit}
          disabled={selectedTeams.length === 0 || !voterName.trim() || isSubmitting}
          size="lg"
          className="gradient-primary text-primary-foreground font-semibold px-8 py-6 text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Vote className="w-5 h-5 mr-2" />
          )}
          {isSubmitting ? 'Submitting...' : 'Submit Vote'}
        </Button>
        
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {getTotalVotes()} votes submitted so far
        </p>
      </div>
    </div>
  );
}
