import { ReplaySubject } from "rxjs"

export class State<T = any> {

  private readonly subject = new ReplaySubject<T>(1)
  private _value: T

  constructor(value?: T) {
    this.value = value
  }

  get value() {
    return this._value
  }

  set value(value: T) {
    this._value = value
    this.subject.next(value)
  }

  get changes() {
    return this.subject.asObservable()
  }

}
