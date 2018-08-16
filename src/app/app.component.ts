import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as copyToClipboard from 'copy-to-clipboard';

import { Lied, verzeichnis } from './verzeichnis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('inputElement') inputElement: ElementRef;
  songList: Lied[] = [];

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }

  onKeydownEnter() {
    const input = this.inputElement.nativeElement.value;
    this.addSong(input);
    this.inputElement.nativeElement.value = '';
  }

  addSong(input: string) {
    const inputLower = input.toLowerCase().trim();
    const map = {
      "Loben": "b",
      "Iwdd!": "g"
    }
    const songs = verzeichnis.filter(L => `${map[L.book]}${L.number}` === inputLower);

    if (songs.length > 0) {
      this.songList.push({
        book: songs[0].book,
        number: songs[0].number,
        name: songs.map(s => s.name).join(' | '),
      });
    }
  }

  copy() {
    const text = this.songList
      .map(song => [song.book, song.number, song.name].join(' '))
      .join('\n');
    copyToClipboard(text);
  }

  remove(index: number) {
    this.songList.splice(index, 1);
  }

  clear() {
    this.songList = [];
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

}
