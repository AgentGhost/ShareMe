import { ChangeDetectionStrategy, Component } from "@angular/core"

import { FavoriteService } from "src/app/favorite.service"
import { ListItem, SongService } from "src/app/song.service"

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsComponent {

  readonly songs = this.songService.songs.changes
  readonly favorites = this.favoriteService.favorites.changes

  constructor(
    private songService: SongService,
    private favoriteService: FavoriteService,
  ) { }

  remove(index: number) {
    this.songService.remove(index)
  }

  favorite(song: ListItem) {
    this.favoriteService.toggle(song)
  }


}
