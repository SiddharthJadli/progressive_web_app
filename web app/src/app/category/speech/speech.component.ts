import {Component, ElementRef} from '@angular/core';
import {io} from 'socket.io-client';
import {Router} from "@angular/router";

@Component({selector: 'app-speech', templateUrl: './speech.component.html', styleUrls: ['./speech.component.css']})

export class SpeechComponent {
    socket : any;
    text : string = '';
    audioFiles: string[] = [];

    constructor(private router : Router) {
        this.socket = io();
        this.socket.on("text to speech successful", (data : any) => {
            console.log("Setting this.audio");
            const audioFile = data.audioFile;
            this.audioFiles.push(audioFile);
            this.loadAndPlayAudio(audioFile);
        });
    }

    textToSpeech() {
        console.log("Emitting textToSpeech event");
        this.socket.emit("textToSpeech", {text: this.text});
    }

    private loadAndPlayAudio(audioFile: string) {
        console.log("playing audio" + audioFile);

        if (this.audioFiles) {
            const mp3Audio = new Audio(audioFile);
            mp3Audio.play().then(() => {
                console.log("Audio successfully.");

            })
        }


    }
}

 
