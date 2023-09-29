import { Component } from '@angular/core';
import{ io } from 'socket.io-client';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css']
})
export class SpeechComponent {
  socket: any;
  text: string ='';

  constructor() {
    this.socket = io();
  }

  textToSpeech() {
    this.socket.emit("textToSpeech", { text: this.text });  }
}
      