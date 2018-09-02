import { Injectable } from "@angular/core"

import { contents } from "src/app/contents/Contents"
import { ListItem } from "src/app/song.service"

const normalize = (input: string): string => {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\u0300-\u036f]/gi, "")
    .replace(/\s+/gi, " ")
    .trim()
}

const listOfSongLists = contents
  .map(content => content.songs.map(song => {
    const selection: ListItem = {
      book: content.short,
      number: song.number,
      name: song.name,
    }
    const keywords = [
      content.qualifier,
      content.short,
      song.number,
      song.name,
    ]
    selection.fulltextSearch = normalize(keywords.join(" "))
    selection.qualifierSearch = content.qualifier + song.number
    return selection
  }))

const allSuggestions: ListItem[] = [].concat(...listOfSongLists)

@Injectable({
  providedIn: "root",
})
export class SuggestionService {

  getSuggestions = (input: string): ListItem[] => {
    const normalizedInput = normalize(input || "")

    if (!normalizedInput) {
      return []
    }

    let result = allSuggestions.filter(suggestion => {
      return suggestion.qualifierSearch.startsWith(normalizedInput)
    })

    if (result.length === 0) {
      const words = normalize(input || "").split(" ")
      result = allSuggestions.filter(suggestion => {
        return words.every(word => {
          return suggestion.fulltextSearch.includes(word)
        })
      })
    }

    return result
  }

}
