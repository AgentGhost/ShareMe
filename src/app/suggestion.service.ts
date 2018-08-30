import { Injectable } from "@angular/core"

import { contents } from "src/app/contents/Contents"
import { Output } from "src/app/songlist.service"

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
    const output: Output = {
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
    output.fulltextSearch = normalize(keywords.join(" "))
    output.qualifierSearch = content.qualifier + song.number
    return output
  }))

const possibleSuggestions: Output[] = [].concat(...listOfSongLists)

console.log(JSON.stringify(possibleSuggestions[0], null, 2))
console.log(JSON.stringify(possibleSuggestions[15], null, 2))
console.log(JSON.stringify(possibleSuggestions[23], null, 2))

@Injectable({
  providedIn: "root",
})
export class SuggestionService {

  getSuggestions(input: string): Output[] {
    const normalizedInput = normalize(input || "")

    let result = possibleSuggestions.filter(suggestion => {
      return suggestion.qualifierSearch.startsWith(normalizedInput)
    })

    if (result.length === 0) {
      const words = normalize(input || "").split(" ")
      result = possibleSuggestions.filter(suggestion => {
        return words.every(word => {
          return suggestion.fulltextSearch.includes(word)
        })
      })
    }

    return result
  }

}
