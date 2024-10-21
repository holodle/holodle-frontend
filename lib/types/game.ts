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
