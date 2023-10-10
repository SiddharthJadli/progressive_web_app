import {Component, ElementRef} from '@angular/core';
import {io} from 'socket.io-client';
import {Router} from "@angular/router";

@Component({selector: 'app-speech', templateUrl: './speech.component.html', styleUrls: ['./speech.component.css']})

export class SpeechComponent {
    socket : any;
    text : string = '';
    audio : string | undefined;


    constructor(private router : Router) {
        this.socket = io();
        this.socket.on("text to speech successful", (data : any) => {
            console.log("Setting this.audio");
            this.audio = '/output.mp3';
            this.loadAndPlayAudio();

        });
    }


    textToSpeech() {
        console.log("Emitting textToSpeech event");
        this.socket.emit("textToSpeech", {text: this.text});
        this.loadAndPlayAudio();

    }
    private loadAndPlayAudio() {
        console.log("playing audio");

        if (this.audio) {
            const mp3Audio = new Audio(this.audio);
            mp3Audio.play().then(() => {
                console.log("Audio successfully.");
            })
        }
    }
}

  // ngOnInit() {
  //   this.loadAndPlayAudio();
  // }

