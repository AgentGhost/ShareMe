import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core"
import { FormControl } from "@angular/forms"

import { debounceTime, map, shareReplay } from "rxjs/operators"
import scrollIntoView, { Options } from "scroll-into-view-if-needed"

import { FavoriteService } from "src/app/favorite.service"
import { ListItem, SongService } from "src/app/song.service"
import { SuggestionService } from "src/app/suggestion.service"

const scrollOptions: Options = {
  block: "nearest",
  scrollMode: "if-needed",
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss", "./suggestions.scss"],
})
export class SearchComponent implements AfterViewInit {

  @ViewChild("inputElement") inputElement: ElementRef

  readonly input = new FormControl()
  readonly favoriteChanges = this.favoriteService.favorites.changes
  readonly suggestionChanges = this.input.valueChanges.pipe(
    debounceTime(100),
    map(this.suggestionsService.getSuggestions),
    map(results => results.slice(0, 30)),
    shareReplay(),
  )

  suggestions: ListItem[] = []
  highlightedSuggestion = 0
  editing = false

  constructor(
    private favoriteService: FavoriteService,
    private songService: SongService,
    private suggestionsService: SuggestionService,
  ) { }

  ngAfterViewInit() {
    this.clear()
    this.suggestionChanges.subscribe(suggestions => {
      this.suggestions = suggestions
      this.inputElement.nativeElement.focus()
      this.highlightSuggestion(0)
      this.updateScroll()
    })
  }

  clear = () => {
    this.input.setValue("")
  }

  addSong = (song: ListItem) => {
    this.clear()
    if (song) {
      this.songService.add(song)
    }
  }

  highlightSuggestion = (index: number) => {
    if (index < 0) {
      this.highlightedSuggestion = this.suggestions.length - 1
    } else if (index >= this.suggestions.length) {
      this.highlightedSuggestion = 0
    } else {
      this.highlightedSuggestion = index
    }
    this.updateScroll()
  }

  updateScroll = () => {
    const selector = `.suggestion:nth-of-type(${this.highlightedSuggestion + 1})`
    const el: any = document.querySelector(selector)

    if (el) {
      scrollIntoView(el, scrollOptions)
    }
  }

  trackSuggestion = (index: number, item: ListItem) => {
    return item.fulltextSearch
  }

}
