import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { contents } from 'src/app/contents/Contents';
import { SonglistService } from 'src/app/songlist.service';

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

    contents.forEach(content => {
      const songs = content.songs.filter(song => {
        return `${content.qualifier}${song.number}` === inputLower;
      });

      if (songs.length > 0) {
        this.songlist.add({
          book: content.short,
          number: songs[0].number,
          name: songs.map(s => s.name).join(' | '),
        });
      }
    });
  }

}
