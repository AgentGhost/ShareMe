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
      if (event.key === this.storageKey && event.newValue) {
        this.favorites.value = JSON.parse(event.newValue) || {}
      }
    })
  }

  toggle(song: ListItem) {
    const key = song.fulltextSearch as string
    const favs = this.favorites.value

    if (key && favs[key]) {
      delete favs[key]
    } else if (key) {
      favs[key] = 1
    }

    this.favorites.value = favs
  }

}
