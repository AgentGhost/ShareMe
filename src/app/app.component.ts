import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { Lied, verzeichnis } from './verzeichnis';
import * as copyToClipboard from 'copy-to-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  input = new FormControl('')
  @ViewChild("inputElement") inputElement: ElementRef
  songList: Lied[] = []

  ngOnInit() {
    this.input.valueChanges.pipe(
      // map(value => value.replace(/\D/g, "")),
      // tap(value => console.log(value)),
    ).subscribe()
    this.addSong("B101")
  }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus()
  }

  onKeydownEnter() {
    const input = this.inputElement.nativeElement.value
    this.addSong(input)
    this.inputElement.nativeElement.value = ""
  }

  addSong(input: string) {
    const song = verzeichnis.find(L => {
      return L.index.toLowerCase() === input.toLowerCase()
    })
    this.songList.push(song)
  }

  // share() {
  //   navigator['share']({
  //     title: 'Web Fundamentals',
  //     text: 'Check out Web Fundamentals — it rocks!',
  //     url: 'https://developers.google.com/web',
  //   })
  //     .then(() => console.log('Successful share'))
  //     .catch((error) => console.log('Error sharing', error));
  // }

  copy() {
    const text = this.songList
      .map(L => L.index + " " + L.name)
      .join("\n")
    copyToClipboard(text)
  }
  
  remove(index:number) {
    this.songList.splice(index, 1)
  }
}