export interface Team {
  id: string;
  name: string;
}

export const teams: Team[] = [
  { id: "1", name: "Thunder Hawks" },
  { id: "2", name: "Storm Riders" },
  { id: "3", name: "Phoenix Rising" },
  { id: "4", name: "Iron Wolves" },
  { id: "5", name: "Golden Eagles" },
  { id: "6", name: "Shadow Panthers" },
  { id: "7", name: "Crimson Titans" },
  { id: "8", name: "Arctic Foxes" },
  { id: "9", name: "Solar Flares" },
  { id: "10", name: "Night Owls" },
  { id: "11", name: "Electric Eels" },
  { id: "12", name: "Blazing Bulls" },
  { id: "13", name: "Cosmic Crusaders" },
  { id: "14", name: "Diamond Dogs" },
  { id: "15", name: "Emerald Dragons" },
  { id: "16", name: "Frozen Falcons" },
  { id: "17", name: "Granite Giants" },
  { id: "18", name: "Hurricane Heroes" },
  { id: "19", name: "Inferno Kings" },
  { id: "20", name: "Jade Jaguars" },
  { id: "21", name: "Killer Bees" },
  { id: "22", name: "Lightning Leopards" },
  { id: "23", name: "Magma Mavericks" },
  { id: "24", name: "Neon Knights" },
  { id: "25", name: "Ocean Warriors" },
  { id: "26", name: "Platinum Pirates" },
  { id: "27", name: "Quantum Quakes" },
  { id: "28", name: "Raging Rapids" },
  { id: "29", name: "Steel Spartans" },
  { id: "30", name: "Tornado Terrors" },
  { id: "31", name: "Ultra Unicorns" },
  { id: "32", name: "Venom Vipers" },
  { id: "33", name: "Wild Wolves" },
  { id: "34", name: "Xtreme Xplorers" },
  { id: "35", name: "Yeti Yellers" },
  { id: "36", name: "Zenith Zephyrs" },
  { id: "37", name: "Alpha Aces" },
  { id: "38", name: "Beta Blazers" },
  { id: "39", name: "Cyber Cyclones" },
  { id: "40", name: "Delta Dynamos" },
  { id: "41", name: "Echo Elite" },
  { id: "42", name: "Fury Force" },
  { id: "43", name: "Galactic Guardians" },
  { id: "44", name: "Hyper Hornets" },
  { id: "45", name: "Ion Invaders" },
  { id: "46", name: "Jet Jumpers" },
  { id: "47", name: "Karma Kickers" },
  { id: "48", name: "Lunar Legends" },
  { id: "49", name: "Meteor Monarchs" },
  { id: "50", name: "Nova Nomads" },
];

export interface Vote {
  id: string;
  voterName: string;
  teamIds: string[];
  timestamp: Date;
}

export interface TeamRanking {
  team: Team;
  voteCount: number;
  rank: number;
}
