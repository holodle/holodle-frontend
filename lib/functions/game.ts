import { GameState, GameStatus, HintData, HintTemperature } from "@/lib/types/game"
import { Result } from "@/lib/types/tools"
import { fail, success, withinOneMonth } from "@/lib/functions/tools"
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

export function getHint(ans: Talent, guess: Talent): HintData {
    const compareBirthday = (a: Talent, b: Talent): HintTemperature => {
        if (a.birthday === b.birthday)
            return HintTemperature.Green
        else if (withinOneMonth(a.birthday, b.birthday))
            return HintTemperature.Yellow
        else
            return HintTemperature.Gray
    }

    const compareAnniversary = (a: Talent, b: Talent): HintTemperature => {
        if (a.anniversary === b.anniversary)
            return HintTemperature.Green
        else if (withinOneMonth(a.anniversary, b.anniversary))
            return HintTemperature.Yellow
        else
            return HintTemperature.Gray
    }

    const compareGeneration = (a: Talent, b: Talent): HintTemperature => {
        if (a.generations.some(aG => b.generations.some(bG => aG.location === bG.location)))
            return HintTemperature.Green
        else if (a.generations.some(aG => b.generations.some(bG => Math.abs(aG.location - bG.location) <= 1)))
            return HintTemperature.Yellow
        else
            return HintTemperature.Gray
    }

    const compareHeight = (a: Talent, b: Talent): HintTemperature => {
        if (a.height === b.height)
            return HintTemperature.Green
        else if (Math.abs(a.height - b.height) <= 3)
            return HintTemperature.Yellow
        else
            return HintTemperature.Gray
    }

    const compareOutfits = (a: Talent, b: Talent): HintTemperature => {
        if (a.outfitCount === b.outfitCount)
            return HintTemperature.Green
        else if (Math.abs(a.outfitCount - b.outfitCount) <= 1)
            return HintTemperature.Yellow
        else
            return HintTemperature.Gray
    }

    const compareSongs = (a: Talent, b: Talent): HintTemperature => {
        if (a.originalSongCount === b.originalSongCount)
            return HintTemperature.Green
        else if (Math.abs(a.originalSongCount - b.originalSongCount) <= 1)
            return HintTemperature.Yellow
        else
            return HintTemperature.Gray
    }

    return {
        birthday: compareBirthday(ans, guess),
        anniversary: compareAnniversary(ans, guess),
        generation: compareGeneration(ans, guess),
        height: compareHeight(ans, guess),
        imageColor: HintTemperature.Green,
        outfitCount: compareOutfits(ans, guess),
        originalSongCount: compareSongs(ans, guess),
    }
}
