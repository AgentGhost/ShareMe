import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { SonglistService } from 'src/app/songlist.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {

  @ViewChild('textareaElement') textareaElement: ElementRef;

  isCopySupported = document.queryCommandSupported && document.queryCommandSupported('copy');
  isShareSupported = !!navigator['share'];

  constructor(
    private songlist: SonglistService,
  ) { }

  mark() {
    const text = this.songlist.output
      .map(song => [song.book, song.number, '-', song.name].join(' '))
      .join('\n');
    return text;
  }

  copy() {
    try {
      const textarea = this.textareaElement.nativeElement;
      textarea.value = this.mark();
      textarea.select();
      document.execCommand('copy');
      console.log('Successful copy');
    } catch (error) {
      console.log('Error copying', error);
    }
  }

  clear() {
    this.songlist.clear();
  }

  share() {
    navigator['share']({
      // title: 'Web Fundamentals',
      text: this.mark(),
      // url: 'https://developers.google.com/web',
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }

}
