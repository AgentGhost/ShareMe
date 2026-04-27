import { Iwdd } from "./Iwdd"
import { Loben } from "./Loben"
import { SuG } from "./SuG"
import { SongSelect } from "./SongSelect"
import { Glorify } from "./Glorify"

export interface Song {
  ccli?: number
  number?: number
  name: string
}

export interface Content {
  qualifier: string
  book: string
  short: string
  publisher: string
  songs: Song[]
  showIndex: boolean
}

export const contents: Content[] = [
  {
    qualifier: "g",
    book: "Ich will dir danken!",
    short: "Iwdd",
    publisher: "Hänssler-Verlag, Bundes-Verlag",
    songs: Iwdd,
    showIndex: true,
  },
  {
    qualifier: "b",
    book: "Loben - Lieder der Hoffnung",
    short: "Loben",
    publisher: "CLV",
    songs: Loben,
    showIndex: true,
  }, 
  {
    qualifier: "s",
    book: "Seht unsern Gott",
    short: "SuG",
    publisher: "Evangelium21 e.V.",
    songs: SuG,
    showIndex: true,
  },
  {
    qualifier: "p",
    book: "Powerpoint - Folien",
    short: "Leinwand",
    publisher: "SongSelect (CCLI)",
    songs: SongSelect,
    showIndex: false,
  },
  {
    qualifier: "n",
    book: "Glorify - Jugendlieder zur Ehre Gottes",
    short: "Glorify",
    publisher: "SCM-Verlag",
    songs: Glorify,
    showIndex: true,
  },
]
