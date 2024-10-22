import { HintData, HintIdentifier, HintTemperature } from "@/lib/types/game"
import { Talent } from "holodle-types"
import { Nullable } from "@/lib/types/tools"
import HintCell from "@/components/HintCell"
import Image from "next/image"
import React from "react"
import { hintMetadata } from "@/lib/config"

type HintRowProps = {
    hint?: Nullable<HintData>
    guess?: Nullable<Talent>
    correct?: Nullable<boolean>
}

export default function HintRow({ hint = null, guess = null, correct = null }: HintRowProps) {
    return (
        <div className={`grid grid-cols-subgrid col-span-full grid-rows-subgrid row-span-1`}>
            <div className={`flex flex-row items-center justify-center gap-x-3 m-[3px] rounded-md ${correct && 'bg-green-400'}`}>
                <div className={"h-14 w-14 flex-none flex items-center justify-center ml-3"}>
                    {guess ? <Image
                        src={`/talents/${guess.id}.png`}
                        alt={guess.name.en}
                        width={64} height={64}
                        className={"rounded-full drop-shadow-md"}
                    /> : <div className={"h-14 w-14 bg-gray-200 opacity-75 rounded-full"}/>}
                </div>
                <p className={"flex-grow text-center text-[16px] leading-tight text-gray-900 font-medium mr-3"}>
                    {guess && guess.name["en"]}
                </p>
            </div>
            {hint
                ? Object.entries(hint) // @ts-ignore
                    .sort((a: [HintIdentifier, HintTemperature], b: [HintIdentifier, HintTemperature]) =>
                        hintMetadata[a[0]].order - hintMetadata[b[0]].order
                    ) // @ts-ignore
                    .map(([hi, ht]: [HintIdentifier, HintTemperature], i) =>
                        <HintCell hintId={hi} hintTemp={ht} guess={guess} key={i}/>
                    )
                : [...Array(Object.entries(hintMetadata).length)].map((_, i) =>
                    <HintCell key={i}/>
                )
            }
        </div>
    )
}
