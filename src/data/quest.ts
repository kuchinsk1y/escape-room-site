export type Quest = {
  id: string;
  title: string;
  theme: "adventure" | "horror" | "mystery" | "detective" | "sci-fi"
  peopleMinMax: [number, number];
  difficulty: "простий" | "середній" | "складний";
  duration: "60 хв" | "90 хв" | "120 хв";
  description: string;
  image: string;
}

export const quests: Quest[] = [
  {
    id: "1704",
    title: "Загублений храм",
    theme: "adventure",
    peopleMinMax: [2, 5],
    difficulty: "середній",
    duration: "60 хв",
    description: "Вирушайте в захоплюючу подорож у пошуках загубленого храму...",
    image: "/images/quest1.jpg",
  },
  {
    id: "1705",
    title: "Будинок з привидами",
    theme: "horror",
    peopleMinMax: [2, 4],
    difficulty: "складний",
    duration: "90 хв",
    description: "Зловісний будинок приховує таємниці та страхіття...",
    image: "/images/quest2.jpg",
  },
  {
    id: "1706",
    title: "Лабораторія майбутнього",
    theme: "sci-fi",
    peopleMinMax: [2, 6],
    difficulty: "простий",
    duration: "60 хв",
    description: "Розгадайте таємниці майбутніх технологій...",
    image: "/images/quest3.jpg",
  },
]
