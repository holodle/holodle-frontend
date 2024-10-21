import Game from "@/components/Game"
import { getAllTalents } from "@/services/talents"
import { Talent } from "holodle-types"


export default async function Page() {
    const req = await getAllTalents()
    let allTalents: Talent[] = []
    if (req.success) {
        allTalents = req.data
    }

    return (
        <>
            <Game talentsJSON={JSON.stringify(allTalents)}/>
        </>
    )
}
