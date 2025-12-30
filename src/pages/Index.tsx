import { useState } from 'react';
import { VotingTab } from '@/components/VotingTab';
import { RankingsTab } from '@/components/RankingsTab';
import { Vote, Trophy, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'vote' | 'rankings';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('vote');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-display text-foreground tracking-wider">
                Team Vote
              </h1>
            </div>

            {/* Tab navigation */}
            <nav className="flex gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setActiveTab('vote')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === 'vote'
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Vote className="w-4 h-4" />
                <span className="hidden sm:inline">Vote</span>
              </button>
              <button
                onClick={() => setActiveTab('rankings')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === 'rankings'
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Rankings</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'vote' ? <VotingTab /> : <RankingsTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            Select your favorite teams • Max 3 selections per vote
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
