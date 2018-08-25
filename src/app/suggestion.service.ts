import { Injectable } from "@angular/core"

import { Output } from "src/app/songlist.service"

@Injectable({
  providedIn: "root",
})
export class SuggestionService {

  getSuggestions(input: string): Output[] {
    // TODO
    return []
  }

}
