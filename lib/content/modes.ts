/** Parent Mode vs RPG Mode — two lenses on the same tracked data. */
export interface AppMode {
  id: "parent" | "rpg";
  name: string;
  promise: string;
  bullets: string[];
}
