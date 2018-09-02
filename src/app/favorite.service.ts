import { Injectable } from "@angular/core"

import { State } from "src/app/State"

import { ListItem } from "./song.service"

interface Favorites {
  [index: string]: any
}

@Injectable({
  providedIn: "root",
})
export class FavoriteService {

  public readonly storageKey = "favorites"
  public readonly favorites = new State<Favorites>({})

  constructor() {
    const restored = window.localStorage.getItem(this.storageKey)
    if (restored) {
      this.favorites.value = JSON.parse(restored)
    } else {
      this.favorites.value = {}
    }
    this.favorites.changes.subscribe(favs => {
      localStorage.setItem(this.storageKey, JSON.stringify(favs))
    })
    window.addEventListener("storage", (event: StorageEvent) => {
      if (event.key === this.storageKey) {
        this.favorites.value = JSON.parse(event.newValue) || {}
      }
    })
  }

  toggle(song: ListItem) {
    const key = song.fulltextSearch
    const favs = this.favorites.value

    if (favs[key]) {
      delete favs[key]
    } else {
      favs[key] = 1
    }

    this.favorites.value = favs
  }

}
