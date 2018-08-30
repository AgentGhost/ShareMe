import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core"
import { FormControl } from "@angular/forms"

import { debounceTime, map } from "rxjs/operators"

import { contents } from "src/app/contents/Contents"
import { SonglistService } from "src/app/songlist.service"
import { SuggestionService } from "src/app/suggestion.service"

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements AfterViewInit {

  @ViewChild("inputElement") inputElement: ElementRef

  readonly input = new FormControl()
  readonly suggestions = this.input.valueChanges.pipe(
    debounceTime(100),
    map(input => this.suggestionsService.getSuggestions(input)),
  )

  constructor(
    private songlistService: SonglistService,
    private suggestionsService: SuggestionService,
  ) { }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus()
    this.input.setValue("g46")
  }

  onKeydownEnter() {
    const input = this.inputElement.nativeElement.value
    this.addSong(input)
    this.inputElement.nativeElement.value = ""
  }

  addSong(input: string) {
    const inputLower = input.toLowerCase().trim()

    contents.forEach(content => {
      const songs = content.songs.filter(song => {
        return `${content.qualifier}${song.number}` === inputLower
      })

      if (songs.length > 0) {
        this.songlistService.add({
          book: content.short,
          number: songs[0].number,
          name: songs.map(s => s.name).join(" | "),
        })
      }
    })
  }

}
