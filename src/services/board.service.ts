import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BoardItem } from 'src/models/board-item';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private httpService: HttpClient, private router: Router) {}

  allBoards: Promise<BoardItem[]> = this.httpService
    .get<any>('assets/board.json')
    .toPromise()
    .then((response) => <BoardItem[]>response.data)
    .then((data) => {
      data.forEach((item) => (item.id = this.createRandomId()));
      return data;
    });

  getBoards() {
    return this.allBoards;
  }

  getBoardById(id: string) {
    return this.allBoards.then((data) => {
      return data.filter((item) => item.id === id)[0];
    });
  }

  addNewBoard(boardItem: BoardItem) {
    boardItem.id = this.createRandomId();
    this.allBoards.then((data) => {
      data.push(boardItem);
      return data;
    });
    // Yeni eklenen board bilgileri gözükür
    this.router.navigateByUrl('/boards/' + boardItem.id);
  }

  //yeni eklenen itemlar random id oluşturulur
  createRandomId() {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 10; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
}
