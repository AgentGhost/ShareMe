import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core"

import { SongService } from "src/app/song.service"

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {

  @ViewChild("textareaElement") textareaElement: ElementRef

  readonly isCopySupported = document.queryCommandSupported && document.queryCommandSupported("copy")
  readonly isShareSupported = !!navigator["share"]
  readonly songs = this.songService.songs.changes

  constructor(
    private songService: SongService,
  ) { }

  mark() {
    const text = this.songService.songs.value
      .map(song => [song.book, song.number, "-", song.name].join(" "))
      .join("\n")
    return text
  }

  copy() {
    try {
      const textarea = this.textareaElement.nativeElement
      textarea.value = this.mark()
      textarea.select()
      textarea.blur()
      document.execCommand("copy")
      console.log("Successful copy")
    } catch (error) {
      console.log("Error copying", error)
    }
  }

  clear() {
    this.songService.clear()
  }

  share() {
    navigator["share"]({ text: this.mark() })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error))
  }

}
