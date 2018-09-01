import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core"
import { FormControl } from "@angular/forms"

import { debounceTime, map, shareReplay } from "rxjs/operators"
import scrollIntoView, { Options } from "scroll-into-view-if-needed"

import { ListItem, SonglistService } from "src/app/songlist.service"
import { SuggestionService } from "src/app/suggestion.service"

const scrollOptions: Options = {
  block: "nearest",
  scrollMode: "if-needed",
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements AfterViewInit {

  @ViewChild("inputElement") inputElement: ElementRef

  readonly input = new FormControl()
  readonly suggestionChanges = this.input.valueChanges.pipe(
    debounceTime(100),
    map(this.suggestionsService.getSuggestions),
    shareReplay(),
  )

  suggestions: ListItem[] = []
  highlightedSuggestion = 0
  busy = false

  constructor(
    private songlistService: SonglistService,
    private suggestionsService: SuggestionService,
  ) { }

  ngAfterViewInit() {
    this.clear()
    this.suggestionChanges.subscribe(suggestions => {
      this.suggestions = suggestions
      this.busy = false
      this.inputElement.nativeElement.focus()
      this.highlightSuggestion(0)
      this.updateScroll()
    })
  }

  clear() {
    this.input.setValue("")
    this.suggestions = []
    this.busy = false
    this.inputElement.nativeElement.focus()
  }

  onKeydownEnter() {
    this.addSong(this.suggestions[this.highlightedSuggestion])
  }

  addSong(song: ListItem) {
    if (song) {
      this.songlistService.add(song)
    }
    this.input.setValue("")
  }

  highlightSuggestion(index: number) {
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

  trackSuggestion(index: number, item: ListItem) {
    return item.fulltextSearch
  }

}
