import { GameState, GameStatus } from "@/lib/types/game"
import { Result } from "@/lib/types/tools"
import { fail, success } from "@/lib/functions/tools"
import { gameConfig } from "@/lib/config"
import { Talent } from "holodle-types"

export default function guess(gameState: GameState, t: Talent): Result<GameState> {
    /* Start the game if the game is fresh */
    if (gameState.status === GameStatus.Fresh) {
        gameState.status = GameStatus.InProgress
    }

    /* Check if the game has concluded */
    if (gameState.status !== GameStatus.InProgress) {
        return fail()
    }

    /* Check if at maximum guesses */
    if (gameState.guesses.length >= gameConfig.maxGuesses) {
        return fail()
    }

    gameState.guesses.push(t)

    if (t.id === gameState.answer.id) {
        gameState.status = GameStatus.Success
        return success(gameState)
    }
    if (gameState.guesses.length >= gameConfig.maxGuesses) {
        gameState.status = GameStatus.Fail
    }
    return success(gameState)
}
