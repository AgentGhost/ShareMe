import { ChangeDetectionStrategy, Component } from "@angular/core"

import { SonglistService, ListItem } from "src/app/songlist.service"
import { FavoriteService } from "../favorite.service";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsComponent {

  readonly songs = this.songlist.observe()
  readonly favorites = this.favlist.observe()

  constructor(
    private songlist: SonglistService,
    private favlist: FavoriteService,
  ) { }

  remove(index: number) {
    this.songlist.remove(index)
  }

  favorite(song: ListItem) {
    this.favlist.toggle(song)
  }

  
}
