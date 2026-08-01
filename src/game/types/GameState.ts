export const GameState = {
  Walking: "Walking",
  Decision: "Decision",
  Camera: "Camera",
  Success: "Success",
  Failure: "Failure",
} as const;

export type GameState =
  (typeof GameState)[keyof typeof GameState];