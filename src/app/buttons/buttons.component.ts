import { ChangeDetectionStrategy, Component } from "@angular/core"

import { SongService } from "src/app/song.service"

import { copyToClipboard } from "./copyToClipboard"

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {

  readonly isCopySupported = document.queryCommandSupported && document.queryCommandSupported("copy")
  readonly isShareSupported = !!navigator["share"]
  readonly songs = this.songService.songs.changes

  constructor(
    private songService: SongService,
  ) { }

  songlistToString() {
    const text = this.songService.songs.value
      .map(song => [song.book, song.number, "-", song.name].join(" "))
      .join("\n")
    return text
  }

  copy() {
    try {
      copyToClipboard(this.songlistToString())
      console.log("Successful copy")
    } catch (error) {
      console.log("Error copying", error)
    }
  }

  clear() {
    this.songService.clear()
  }

  share() {
    navigator["share"]({ text: this.songlistToString() })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error))
  }

}
