import { HintMetadata } from "@/lib/types/game"

export const gameConfig = {
    maxGuesses: 5
}

export const hintMetadata: HintMetadata = {
    generation: {
        title: "Generation",
        descriptions: [
            "The generation(s) the talent belongs in (e.g. hololive English - Myth)."
        ],
        criteria: {
            1: "Within ±1 generation in chronological reveal order, within each branch",
            2: "Exact match"
        },
        relevantTalentAttribute: "generations",
        order: 0
    },
    birthday: {
        title: "Birthday",
        descriptions: [
            "The birthday of the talent."
        ],
        criteria: {
            1: "Within ±31 days",
            2: "Exact match"
        },
        relevantTalentAttribute: "birthday",
        order: 1
    },
    anniversary: {
        title: "Debut Anniversary",
        descriptions: [
            "The debut anniversary of the talent.",
            "Does not take the debut year into consideration."
        ],
        criteria: {
            1: "Within ±31 days",
            2: "Exact match"
        },
        relevantTalentAttribute: "anniversary",
        order: 2
    },
    height: {
        title: "Height",
        descriptions: [
            "The height of the talent (excluding detachable objects)."
        ],
        criteria: {
            1: "Within ±3cm",
            2: "Exact height"
        },
        relevantTalentAttribute: "height",
        order: 3
    },
    imageColor: {
        title: "Image Color",
        descriptions: [
            "The image color of the talent.",
            "Based off of the lighter of the two image colors on the official hololive talent webpages."
        ],
        criteria: {
            1: "Reasonably close in color (using CIE94 color difference definition)",
            2: "Exact color"
        },
        relevantTalentAttribute: "imageColor",
        order: 4
    },
    outfitCount: {
        title: "Unique Outfit Count",
        descriptions: [
            "The number of unique outfits the talent has. (excl. group (idol) outfits, but incl. ReGLOSS Daybreak outfits)",
            "Based off of the number of portraits on the official hololive talent webpages."
        ],
        criteria: {
            1: "Within ±1 outfit",
            2: "Exact amount of outfits"
        },
        relevantTalentAttribute: "outfitCount",
        order: 5
    },
    originalSongCount: {
        title: "Original Song Count",
        descriptions: [
            "The number of original songs the talent has.",
            "Based off of the number of original, solo songs released on streaming platforms (i.e. Apple Music, Spotify, etc.)."
        ],
        criteria: {
            1: "Within ±1 song",
            2: "Exact amount of songs"
        },
        relevantTalentAttribute: "originalSongCount",
        order: 6
    },
}
