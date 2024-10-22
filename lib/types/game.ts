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

export type HintIdentifier =
      "birthday"
    | "anniversary"
    | "generation"
    | "height"
    | "imageColor"
    | "outfitCount"
    | "originalSongCount"


export type HintData = {
    [key in HintIdentifier]: HintTemperature
}

export type HintMetadata = {
    [key in HintIdentifier]: {
        title: string
        descriptions: string[]
        criteria: Partial<{
            [key in HintTemperature]: string
        }>
        relevantTalentAttribute: keyof Talent
        order: number
    }
}
