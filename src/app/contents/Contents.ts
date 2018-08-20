export interface Song {
    number: number
    name: string
}

export interface Content {
    qualifier: string
    book: string
    short: string
    songs: Song[]
}

import { Iwdd } from "./Iwdd"
import { Loben } from "./Loben"

export const contents: Content[] = [
    { qualifier: "g", book: 'Ich will dir danken!', short: 'Iwdd!', songs: Iwdd },
    { qualifier: "b", book: 'Loben - Lieder der Hoffnung', short: 'Loben', songs: Loben }
]