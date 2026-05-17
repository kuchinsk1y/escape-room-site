export class CreateQuestDto {
  title!: string;
  description!: string;
  theme!: string;
  duration!: number;
  minPlayers!: number;
  maxPlayers!: number;
  difficulty!: string;
  image?: string;
  is_active?: boolean;
}
