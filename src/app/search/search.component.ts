import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { SonglistService } from 'src/app/songlist.service';
import { verzeichnis } from 'src/app/verzeichnis';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  @ViewChild('inputElement') inputElement: ElementRef;

  constructor(
    private songlist: SonglistService,
  ) { }

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
      'Loben': 'b',
      'Iwdd!': 'g'
    };
    const songs = verzeichnis.filter(L => `${map[L.book]}${L.number}` === inputLower);

    if (songs.length > 0) {
      this.songlist.add({
        book: songs[0].book,
        number: songs[0].number,
        name: songs.map(s => s.name).join(' | '),
      });
    }
  }

}
