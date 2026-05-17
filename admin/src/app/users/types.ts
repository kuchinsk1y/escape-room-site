export type User = {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  color: "green" | "red";
  createdAt: string;
}
