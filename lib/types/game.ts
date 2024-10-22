import { Talent } from "holodle-types"

export type GameState = {
    answer: Talent
    guesses: Talent[]
    status: GameStatus
}

export enum GameStatus {
    Fresh,
    InProgress,
    Fail,
    Success
}

export enum HintTemperature {
    Gray,
    Yellow,
    Green
}

export type HintCategories =
      "birthday"
    | "anniversary"
    | "generation"
    | "height"
    | "imageColor"
    | "outfitCount"
    | "originalSongCount"


export type Hint = {
    [key in HintCategories]: HintTemperature
}
