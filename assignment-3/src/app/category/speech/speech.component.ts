import { Component } from '@angular/core';
// import{ io } from 'socket.io-client';
import { Router } from "@angular/router";

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css']
})
export class SpeechComponent {
  socket: any;
  text: string ='';
  audio: string | undefined;
  
  // constructor(private router: Router) {
  //   this.socket = io();
  //   this.socket.on("text to speech successful", (data: any) => {
  //     console.log("Setting this.audio");
      
  //     this.audio = data.audioFile;
          
  //   });
  // }

  textToSpeech() {
    console.log("Emitting textToSpeech event");
    this.socket.emit("textToSpeech", { text: this.text }); 

   }
}
      
