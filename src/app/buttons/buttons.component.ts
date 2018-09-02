import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core"

import { ReplaySubject } from "rxjs"

import { SonglistService } from "src/app/songlist.service"

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
  readonly songs = this.songlist.observe()

  sharing = new ReplaySubject<boolean>(1)

  constructor(
    private songlist: SonglistService,
  ) { }

  mark() {
    const text = this.songlist.current
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
    this.songlist.clear()
  }

  async share() {
    try {
      this.sharing.next(true)
      await navigator["share"]({ text: this.mark() })
      console.log("Successful share")
    } catch (error) {
      console.log("Error sharing", error)
    } finally {
      this.sharing.next(false)
    }
  }

}
