import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, inject } from "@angular/core"

import { SongService } from "src/app/song.service"

import { copyToClipboard } from "./copyToClipboard"

@Component({
    selector: "app-buttons",
    templateUrl: "./buttons.component.html",
    styleUrls: ["./buttons.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class ButtonsComponent {
  private songService = inject(SongService);


  readonly isCopySupported =
    "clipboard" in navigator || Boolean(document.queryCommandSupported?.("copy"))
  // Web Share works well on mobile browsers (the app's primary target).
  // Desktop Chrome exposes navigator.share too, but the OS share sheet has
  // no text targets and opens broken — so only offer Share on touch devices.
  readonly isShareSupported =
    "share" in navigator && window.matchMedia("(any-pointer: coarse)").matches
  readonly songs = this.songService.songs.changes

  songlistToString() {
    const text = this.songService.songs.value
      .map(song => [song.book, song.number, "-", song.name].join(" "))
      .join("\n")
    return text
  }

  copy() {
    copyToClipboard(this.songlistToString())
      .then(() => console.log("Successful copy"))
      .catch((error) => console.log("Error copying", error))
  }

  clear() {
    this.songService.clear()
  }

  share() {
    const data: ShareData = {
      title: "ShareMe",
      text: this.songlistToString(),
    }
    if (!navigator.canShare || !navigator.canShare(data)) {
      this.copy()
      return
    }
    navigator.share(data).catch((error: unknown) => {
      // AbortError = the user dismissed the share sheet; anything else
      // (e.g. the flaky Windows share UI) falls back to copying.
      if (error instanceof DOMException && error.name === "AbortError") {
        return
      }
      this.copy()
    })
  }

}
