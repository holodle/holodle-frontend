import { Nullable } from "@/lib/types/tools"
import { Talent } from "holodle-types"

export function matchTalent(talents: Talent[], searchString: string): Nullable<Talent> {
    return talents.find(t => {
        /* Try to match full name */
        if (Object.values(t.name).some(n => n.toLowerCase() === searchString)) return true
        /* Also try to match alias */
        if (t.aliases.some(a => Object.values(a).some(n => n.toLowerCase() === searchString))) return true
    }) ?? null
}

export function searchTalents(talents: Talent[], searchString: string): Talent[] {
    return talents.filter(t => {
        /* Try to match full name */
        if (Object.values(t.name).some(n => n.toLowerCase().includes(searchString.toLowerCase()))) return true
        /* Also try to match alias */
        if (t.aliases.some(a => Object.values(a).some(n => n.toLowerCase().includes(searchString.toLowerCase())))) return true
    })
}

export function getGenerationString(talent: Talent): string {
    if (talent.generations.length >= 2) {
        // Only show "Promise" if talent has another associated generation (Council, etc.)
        if (talent.generations.some(g => g.name['en'] === "Promise")) {
            return "Promise"
        } else {
            return talent.generations.map(g => g.name["en"]).join(" & ")
        }
    } else {
        return talent.generations[0].name['en']
    }
}
