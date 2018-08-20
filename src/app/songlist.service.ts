import { Injectable } from '@angular/core';
import { Lied } from 'src/app/verzeichnis';

@Injectable({
  providedIn: 'root'
})
export class SonglistService {

  private songlist: Lied[];

  get songs(): Lied[] {
    return [...this.songlist];
  }

  add(song: Lied): void {
    this.songlist.push(song);
  }

  remove(index: number) {
    this.songlist.splice(index, 1);
  }

  clear() {
    this.songlist = [];
  }

}
