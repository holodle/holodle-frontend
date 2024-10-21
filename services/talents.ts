import { Result } from "@/lib/types/tools"
import { fail, success } from "@/lib/functions/tools"
import { ITalent, Talent } from "holodle-types"

export async function getAllTalents(): Promise<Result<Talent[]>> {
    const response = await fetch(
        "http://localhost:3000" + `/talents`,
        { method: "get", cache: "no-store" },

    )
    if (response.status >= 400) {
        return fail((await response.json()).message)
    }
    const jTalents = <ITalent[]>(await response.json())
    const talents = jTalents.map(j => new Talent(j))
    return success(talents)
}
