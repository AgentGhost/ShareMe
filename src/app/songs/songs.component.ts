import { ChangeDetectionStrategy, Component } from "@angular/core"

import { SonglistService } from "src/app/songlist.service"

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsComponent {

  songs = this.songlist.observe()

  constructor(
    private songlist: SonglistService,
  ) { }

  remove(index: number) {
    this.songlist.remove(index)
  }

}
