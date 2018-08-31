import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ListItem } from './songlist.service';

interface Favorites {
  [index: string]: any
}

const storageKey = "favorites"

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private readonly subject = new ReplaySubject<Favorites>(1)
  private favorites: Favorites = {}

  constructor() {
    const restored = window.localStorage.getItem(storageKey)
    if (restored) {
      this.update(JSON.parse(restored))
    } else {
      this.update({})
    }
    this.subject.subscribe(favs => {
      localStorage.setItem(storageKey, JSON.stringify(favs))
    })
    window.addEventListener("storage", (event: StorageEvent) => {
      if (event.key === storageKey) {
        this.update(JSON.parse(event.newValue))
      }
    })
  }

  toggle(song: ListItem) {
    const key = song.fulltextSearch
    const favs = this.favorites

    if (favs[key]) {
      delete favs[key]
    } else {
      favs[key] = 1
    }

    this.update(favs)
  }

  observe() {
    return this.subject.asObservable()
  }

  update(favorites: Favorites) {
    this.favorites = favorites
    this.subject.next(favorites)
  }
}
