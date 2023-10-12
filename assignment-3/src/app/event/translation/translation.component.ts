import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {
  text: any;
  selectedLanguage: string = "Select target language";
  translatedResponses: any[] = [];
  socket = io('http://localhost:8080');

  constructor() {
    this.socket.on('translatedResponse', (data) => {
      console.log(data);
      this.translatedResponses.push(data);
    });
  }

  translate() {
    const data = {
      text: this.text,
      targetLanguage: this.selectedLanguage,
      response: ""
    };
    
    this.socket.emit('translate', data);
  }
}
