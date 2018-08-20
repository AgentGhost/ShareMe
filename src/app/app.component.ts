import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { contents, Content, Song } from './contents/Contents';

interface Output {
  book: string
  number: number
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('inputElement') inputElement: ElementRef
  
  @ViewChild('textareaElement') textareaElement: ElementRef

  isCopySupported = document.queryCommandSupported && document.queryCommandSupported('copy')
  isShareSupported = !!navigator['share']

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus()
  }

  onKeydownEnter() {
    const input = this.inputElement.nativeElement.value
    this.addSong(input)
    this.inputElement.nativeElement.value = ''
  }

  songList: Output[] = []

  addSong(input: string) {
    const inputLower = input.toLowerCase().trim()
    const songArrays = contents.map(content => {
      const songs = content.songs.filter(song => {
          return `${content.qualifier}${song.number}` === inputLower 
        })
        if (songs.length > 0) {
          this.songList.push({
            book: content.short,
            number: songs[0].number,
            name: songs.map(s => s.name).join(' | '),
          });
        }
    })   
  }

  mark() {
    const text = this.songList
      .map(song => [song.book, song.number, '-', song.name].join(' '))
      .join('\n')
    return text
  }

  copy() {
    try {
      const textarea = this.textareaElement.nativeElement
      textarea.value = this.mark()
      textarea.select()
      document.execCommand('copy')
      console.log('Successful copy')
    } catch (error) {
      console.log('Error copying', error)
    }
  }

  remove(index: number) {
    this.songList.splice(index, 1)
  }

  clear() {
    this.songList = []
  }

  share() {
    navigator['share']({
      // title: 'Web Fundamentals',
      text: this.mark(),
      // url: 'https://developers.google.com/web',
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error))
  }
}
