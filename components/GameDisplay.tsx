import { GameState, HintTemperature } from "@/lib/types/game"
import { Talent } from "holodle-types"
import { getHint } from "@/lib/functions/game"
import { gameConfig } from "@/lib/config"
import { Nullable } from "@/lib/types/tools"
import Image from "next/image";
import React from "react";

export default function GameDisplay({ gameState }: { gameState: GameState }) {
    return (
        <div className={`grid grid-cols-${gameConfig.hintColumns + 2} grid-rows-${gameConfig.maxGuesses + 1} h-[560px] w-[960px]`}>
            {gameState.guesses.map((g, i) =>
                <GameDisplayRow key={`${i}-${g.id}`} row={i + 2} answer={gameState.answer} guess={g}/>
            )}
            {[...Array(gameConfig.maxGuesses - gameState.guesses.length)].map((_, i) =>
                <GameDisplayRow key={i} row={gameState.guesses.length + i + 2} answer={gameState.answer}/>
            )}
        </div>
    )
}


export function GameDisplayRow({ row, answer, guess = null }: { row: number, answer: Talent, guess?: Nullable<Talent> }) {
    return (
        <div className={`row-start-${row} col-start-1 -col-end-1 grid grid-cols-${gameConfig.hintColumns + 2} text-sm`}>
            <div className={"flex flex-row items-center justify-center col-span-2 gap-x-3"}>
                {guess !== null
                    ? <>
                        <div className={"h-14 w-14 flex-none flex items-center justify-center"}>
                            <Image
                                src={`/talents/${guess.id}.png`}
                                alt={guess.name.en}
                                width={64} height={64}
                                className={"rounded-full drop-shadow-md"}
                            />
                        </div>
                        <p className={"flex-grow text-center text-[16px] leading-tight text-gray-900 font-medium pr-3"}>
                            {guess.name["en"]}
                        </p>
                    </>
                    : <>
                        <div className={"h-14 w-14 flex-none bg-gray-100 rounded-full bg-opacity-75"}/>
                        <div className={"flex-grow"}/>
                    </>
                }
            </div>

            {guess !== null
                ? Object.entries(getHint(answer, guess)).map((h, i) => {
                    let color: string
                    switch (h[1]) {
                        case HintTemperature.Gray:
                            color = "bg-gray-400 border-gray-500"
                            break
                        case HintTemperature.Yellow:
                            color = "bg-yellow-300 border-yellow-400"
                            break
                        case HintTemperature.Green:
                            color = "bg-green-400 border-green-500"
                            break
                    }
                    return <div key={i} className={`m-1 ${color} border-[2px] border-opacity-30 rounded-lg`}>
                        {h[0]}
                    </div>
                }
                )
                : [...Array(gameConfig.hintColumns)].map((a, i) =>
                    <div key={i} className={"m-1 bg-gray-100 rounded-lg bg-opacity-75"}>

                    </div>
                )
            }
        </div>
    )
}
