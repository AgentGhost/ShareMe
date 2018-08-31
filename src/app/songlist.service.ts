import { Injectable } from "@angular/core"

import { ReplaySubject } from "rxjs"

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
export class SonglistService {

  private listItems: ListItem[] = []
  private listItemsSubject = new ReplaySubject<ListItem[]>(1)

  constructor() {
    const restored = window.localStorage.getItem("songlist")
    if (restored) {
      this.listItems = JSON.parse(restored)
    } else {
      this.listItems = []
    }
    this.emit()
    this.observe().subscribe(list => {
      const updated = JSON.stringify(list)
      window.localStorage.setItem("songlist", updated)
    })
  }

  get current() {
    return [...this.listItems]
  }

  observe() {
    return this.listItemsSubject.asObservable()
  }

  add(song: ListItem) {
    this.listItems.push(song)
    this.emit()
  }

  remove(index: number) {
    this.listItems.splice(index, 1)
    this.emit()
  }

  clear() {
    this.listItems = []
    this.emit()
  }

  private emit() {
    this.listItemsSubject.next([...this.listItems])
  }

}
