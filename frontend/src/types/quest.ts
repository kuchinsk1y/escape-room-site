export type Quest = {
  id: number;
  title: string;
  description: string;
  theme: string;
  duration: number;
  minPlayers: number;
  maxPlayers: number;
  difficulty: string;
  price: number;
  image: string;
  is_active: boolean;
}
