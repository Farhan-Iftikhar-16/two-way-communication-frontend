import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor() { }
  private socket = io('http://localhost:3000');


  createConnection(): void {
    this.socket.emit('CREATE_CONNECTION');
  }

  connectionCreated(): Observable<any> {
    return new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('CONNECTION_CREATED', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  sendMessage(data): void {
    this.socket.emit('SEND_MESSAGE',data);
  }

  receiveMessage(): Observable<any> {
    return new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('RECEIVE_MESSAGE', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
}
