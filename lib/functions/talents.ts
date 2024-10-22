import { Nullable } from "@/lib/types/tools"
import { Talent } from "holodle-types"

export function matchTalent(talents: Talent[], searchString: string): Nullable<Talent> {
    return talents.find(t => {
        /* Try to match full name */
        if (Object.values(t.name).some(n => n.split(" ").some(x => x.toLowerCase() === searchString.toLowerCase()))) return true
        /* Also try to match alias */
        if (t.aliases.some(a => Object.values(a).some(n => n.toLowerCase() === searchString.toLowerCase()))) return true
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

export function getTalentGenerationString(talent: Talent): string {
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

export function getMMDDString(date: string): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const daySuffix = {"st": [1, 21, 31], "nd": [2, 22], "rd": [3, 23]}
    const dateObj = new Date(2000, Number(date.substring(0, 2)) - 1, Number(date.substring(2, 4)))
    let dd = String(dateObj.getDate())
    Object.entries(daySuffix).forEach(([s, d]) => {
        if (d.some(n => n === dateObj.getDate())) dd += s
    })
    if (dd.length <= 2) dd += "th"
    return `${months[dateObj.getMonth()]} ${dd}`
}
