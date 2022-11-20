import {Component, OnInit} from '@angular/core';
import {MessageService} from "./message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  message;
  messages = [];
  title = 'two-way-communication';

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.createConnection();

    this.messageService.connectionCreated().subscribe(data => console.log(data));


    this.messageService.receiveMessage().subscribe(data => this.messages.push(data));
  }

  createConnection(): void {
    this.messageService.createConnection();
  }


  sendMessage(): void {
    this.messageService.sendMessage(this.message);
  }
}
