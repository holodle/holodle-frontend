"use client"

import { useState } from "react"
import { ITalent, Talent } from "holodle-types"
import { TalentInput, Button } from "@/components"
import guess from "@/lib/functions/game"
import { GameState, GameStatus } from "@/lib/types/game"
import { Nullable } from "@/lib/types/tools"
import { gameConfig } from "@/lib/config"

export default function Game({ talentsJSON }: { talentsJSON: string }) {
    const talentsParsed: ITalent[] = JSON.parse(talentsJSON)
    const talents = talentsParsed.map(t => new Talent(t))

    const [selectedTalent, setSelectedTalent] = useState<Nullable<Talent>>(null)
    const [gameState, setGameState] = useState<GameState>({
        answer: talents[Math.floor(talents.length * Math.random())],
        guesses: [],
        status: GameStatus.Fresh
    })
    const talentInputId = "talent-input"

    const statusDisplay = (gs: GameState) => {
        switch (gs.status) {
            case GameStatus.Fresh:
                return <p>Game Not Started</p>
            case GameStatus.InProgress:
                return <p>Game In Progress ({gs.guesses.length}/{gameConfig.maxGuesses})</p>
            case GameStatus.Fail:
                return <b>You Lose!!</b>
            case GameStatus.Success:
                return <b>You Win!!</b>
        }
    }

    const guessCallback = () => {
        if (selectedTalent) {
            setGameState(g => {
                const res = guess(g, selectedTalent)
                if (res.success) {
                    return structuredClone(res.data)
                }
                return g
            })
            const i = document.getElementById(talentInputId) as HTMLInputElement
            i.value = ""
            setSelectedTalent(null)
        }
    }

    const resetCallback = () => {
        setGameState({ answer: talents[Math.floor(talents.length * Math.random())], guesses: [], status: GameStatus.Fresh })
    }

    return (
        <div className={"w-full flex flex-col items-center justify-center py-24 gap-y-8"}>
            <h1 className={"text-[48px] font-semibold"}>holodle</h1>

            <div className={"flex flex-col gap-2 items-center justify-center"}>
                {statusDisplay(gameState)}
                {gameState.guesses.map(t =>
                    <p>{t.name["en"]} {(t.id === gameState.answer.id) ? "CORRECT" : "WRONG"}</p>
                )}
            </div>

            {gameState.status < 2 ? <>
                <TalentInput
                    talents={talents}
                    selectedTalent={selectedTalent}
                    setSelectedTalent={setSelectedTalent}
                    id={talentInputId}
                />
                <Button config={{ text: "Guess!", theme: "blue", disabled: selectedTalent === null }} onClick={guessCallback} />
            </> : <>
                <Button config={{ text: "Reset", theme: "blue" }} onClick={resetCallback}/>
            </>}
        </div>
    )
}