import { Team } from '@/data/teams';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  selectionNumber?: number;
}

export function TeamCard({ team, isSelected, onToggle, disabled, selectionNumber }: TeamCardProps) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled && !isSelected}
      className={cn(
        "team-card group relative w-full text-left",
        isSelected && "selected",
        disabled && !isSelected && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Selection indicator */}
      {isSelected && selectionNumber && (
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-lg animate-scale-in">
          {selectionNumber}
        </div>
      )}
      
      {/* Team avatar */}
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center text-xl font-display mb-3 transition-all",
        isSelected 
          ? "gradient-primary text-primary-foreground" 
          : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
      )}>
        {team.name.charAt(0)}
      </div>
      
      {/* Team name */}
      <h3 className={cn(
        "font-semibold text-sm transition-colors",
        isSelected ? "text-primary" : "text-foreground"
      )}>
        {team.name}
      </h3>
      
      {/* Check mark for selected */}
      {isSelected && (
        <div className="absolute bottom-3 right-3 text-primary animate-scale-in">
          <Check className="w-5 h-5" />
        </div>
      )}
      
      {/* Hover glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-lg opacity-0 transition-opacity pointer-events-none",
        "bg-gradient-to-br from-primary/5 to-transparent",
        !disabled && "group-hover:opacity-100"
      )} />
    </button>
  );
}
