import { HintIdentifier, HintMetadata, HintTemperature } from "@/lib/types/game"
import { Talent } from "holodle-types"
import { Nullable } from "@/lib/types/tools"
import { hintMetadata } from "@/lib/config";
import { getMMDDString, getTalentGenerationString } from "@/lib/functions/talents";

type HintCellProps = {
    hintId?: Nullable<HintIdentifier>
    hintTemp?: Nullable<HintTemperature>
    guess?: Nullable<Talent>
}

export default function HintCell({ hintId = null, hintTemp = null, guess = null }: HintCellProps) {
    let color: string
    switch (hintTemp) {
        case HintTemperature.Gray:
            color = "bg-gray-400 border-gray-500"
            break
        case HintTemperature.Yellow:
            color = "bg-yellow-300 border-yellow-400"
            break
        case HintTemperature.Green:
            color = "bg-green-400 border-green-500"
            break
        default:
            color = "bg-gray-200 opacity-75"
    }
    return (
        <div className={`
            m-[3px] ${color} border-[0px] border-opacity-20 rounded-md 
            flex flex-col items-center justify-center text-center
            font-medium text-[15px] tracking-tight
        `}>
            {guess && hintId &&
                <HintCellInner hintId={hintId} talent={guess}/>
            }
        </div>
    )
}

export function HintCellInner({ hintId, talent }: { hintId: HintIdentifier, talent: Talent }) {
    const hm = hintId && hintMetadata[hintId]
    switch (hintId) {
        case "birthday":
            return <>
                <p className={"text-[15px]"}>{getMMDDString(talent["birthday"])}</p>
            </>
        case "anniversary":
            return <>
                <p>{getMMDDString(talent["anniversary"])}</p>
            </>
        case "generation":
            return <>
                <p className={"text-[10px] leading-tight font-normal mb-0.5"}>{talent.generations[0].branch.name['en']}</p>
                <p className={"text-[13px] leading-tight"}>{getTalentGenerationString(talent)}</p>
            </>
        case "height":
            return <>
                <p>{talent.height}cm</p>
            </>
        case "imageColor":
            return <>
                <div className={"h-9 w-9 rounded-full border-4 border-white"} style={{ backgroundColor: talent.imageColor }}/>
                <p className={"text-[10px] font-normal mt-1"}>{talent.imageColor}</p>
            </>
        case "outfitCount":
            return <>
                <p className={"text-[18px]"}>{talent.outfitCount}</p>
            </>
        case "originalSongCount":
            return <>
                <p className={"text-[18px]"}>{talent.originalSongCount}</p>
            </>
    }
}
