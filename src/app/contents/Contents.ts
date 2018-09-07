import { Iwdd } from "./Iwdd"
import { Loben } from "./Loben"
import { SongSelect } from "./SongSelect"

export interface Song {
  number: number
  name: string
}

export interface Content {
  qualifier: string
  book: string
  short: string
  publisher: string
  songs: Song[]
}

export const contents: Content[] = [
  {
    qualifier: "g",
    book: "Ich will dir danken!",
    short: "Iwdd",
    publisher: "Hänssler-Verlag, Bundes-Verlag",
    songs: Iwdd,
  },
  {
    qualifier: "b",
    book: "Loben - Lieder der Hoffnung",
    short: "Loben",
    publisher: "CLV",
    songs: Loben,
  },
  {
    qualifier: "p",
    book: "Powerpoint - Folien",
    short: "Leinwand",
    publisher: "SongSelect (CCLI)",
    songs: SongSelect,
  }
]
