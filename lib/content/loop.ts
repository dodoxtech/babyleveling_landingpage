/** One step in the care -> XP mapping, e.g. { realAction: "Feeding", gameReward: "+Energy", icon: "icon.bottle" } */
export interface LoopStep {
  id: string;
  realAction: string;
  gameReward: string;
  icon: string;
}
