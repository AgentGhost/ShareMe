import { Injectable } from "@angular/core"

import { State } from "src/app/State"

export interface ListItem {
  book: string
  number: number
  name: string
  fulltextSearch?: string
  qualifierSearch?: string
}

@Injectable({
  providedIn: "root",
})
export class SongService {

  public readonly storageKey = "songlist"
  public readonly songs = new State<ListItem[]>([])

  constructor() {
    const restored = localStorage.getItem(this.storageKey)
    if (restored) {
      this.songs.value = JSON.parse(restored)
    } else {
      this.songs.value = []
    }
    this.songs.changes.subscribe(list => {
      const updated = JSON.stringify(list)
      localStorage.setItem(this.storageKey, updated)
    })
  }

  add(song: ListItem) {
    this.songs.value = [...this.songs.value, song]
  }

  remove(index: number) {
    this.songs.value.splice(index, 1)
    this.songs.value = [...this.songs.value]
  }

  clear() {
    this.songs.value = []
  }

}
