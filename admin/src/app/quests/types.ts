export type Quest = {
  id: number | string;
  title: string;
  description: string;
  theme: string;
  duration: number;
  minPlayers: number;
  maxPlayers: number;
  difficulty: "easy" | "medium" | "hard";
  image: string;
  is_active: boolean;
  price: number;
}
