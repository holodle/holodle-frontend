import { GameState, HintTemperature } from "@/lib/types/game"
import { Talent } from "holodle-types"
import guess, { getHint } from "@/lib/functions/game"
import { gameConfig, hintMetadata } from "@/lib/config"
import { Nullable } from "@/lib/types/tools"
import Image from "next/image";
import React from "react";
import HintRow from "@/components/HintRow";

export default function HintDisplay({ gameState }: { gameState: GameState }) {
    const hintColumns = Object.entries(hintMetadata).length
    const firstColWidth = 180
    const firstRowHeight = 36

    return (
        <div
            className={`grid h-[420px] w-[960px] select-none`}
            style={{
                gridTemplateColumns: `${firstColWidth}px repeat(${hintColumns}, minmax(0, 1fr))`,
                gridTemplateRows: `${firstRowHeight}px repeat(${gameConfig.maxGuesses}, minmax(0, 1fr))`
            }}
        >
            <div className={`grid grid-cols-subgrid col-span-full text-sm mb-0.5`}>
                <div className={"flex items-end justify-center"}>
                    <p className={"text-center text-[11px] text-gray-600"}>Talent</p>
                </div>
                {Object.entries(hintMetadata)
                    .sort((a, b) =>
                        a[1].order - b[1].order
                    )
                    .map(([hf, hm]) =>
                        <div key={hf} className={`col-start-${hm.order + 2} flex items-end justify-center`}>
                            <p className={"text-center text-[11px] text-gray-600"}>{hm.title}</p>
                        </div>
                    )
                }
            </div>
            {gameState.guesses.map((g, i) =>
                <HintRow hint={getHint(gameState.answer, g)} guess={g} correct={gameState.answer.id === g.id} key={`${i}g`}/>
            )}
            {[...Array(gameConfig.maxGuesses - gameState.guesses.length)].map((_, i) =>
                <HintRow key={`${i}o`}/>
            )}
        </div>
    )
}
