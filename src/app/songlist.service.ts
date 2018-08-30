import { Injectable } from "@angular/core"

import { Observable, ReplaySubject } from "rxjs"

export interface Output {
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

  private list: Output[] = []
  private subject = new ReplaySubject<Output[]>(1)

  constructor() {
    const restored = window.localStorage.getItem("songlist")
    if (restored) {
      this.list = JSON.parse(restored)
    } else {
      this.list = []
    }
    this.emit()
    this.observe().subscribe(list => {
      const updated = JSON.stringify(list)
      window.localStorage.setItem("songlist", updated)
    })
  }

  get output(): Output[] {
    return [...this.list]
  }

  observe(): Observable<Output[]> {
    return this.subject.asObservable()
  }

  add(output: Output): void {
    this.list.push(output)
    this.emit()
  }

  remove(index: number) {
    this.list.splice(index, 1)
    this.emit()
  }

  clear() {
    this.list = []
    this.emit()
  }

  private emit() {
    this.subject.next([...this.list])
  }

}
