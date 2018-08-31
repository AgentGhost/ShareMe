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
  focusedIndex = 0
  busy = false

  constructor(
    private songlistService: SonglistService,
    private suggestionsService: SuggestionService,
  ) { }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus()
    this.suggestionChanges.subscribe(suggestions => {
      this.suggestions = suggestions
      this.busy = false
      this.focusSuggestion(0)
      this.updateScroll()
    })
  }

  onKeydownEnter() {
    this.addSong(this.suggestions[this.focusedIndex])
  }

  addSong(song: ListItem) {
    if (song) {
      this.songlistService.add(song)
    }
    this.input.setValue("")
  }

  focusSuggestion(index: number) {
    if (index < 0) {
      this.focusedIndex = this.suggestions.length - 1
    } else if (index >= this.suggestions.length) {
      this.focusedIndex = 0
    } else {
      this.focusedIndex = index
    }
    this.updateScroll()
  }

  updateScroll = () => {
    const selector = `.suggestion:nth-of-type(${this.focusedIndex + 1})`
    const el: any = document.querySelector(selector)

    if (el) {
      scrollIntoView(el, scrollOptions)
    }
  }

  trackSuggestion(index: number, item: ListItem) {
    return item.fulltextSearch
  }

}
