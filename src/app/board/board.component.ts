import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BoardItem } from 'src/models/board-item';
import { BoardService } from 'src/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() boardItems?: BoardItem;
  constructor(private router: Router, private boardService: BoardService, private titleService: Title) {}

  last: BoardItem[] = [];
  ngOnInit(): void {
    var boardId = this.router.url.split('/')[2];
    this.getBoardById(boardId);
    this.listenToRouteChange();
  }

  listenToRouteChange() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.getBoardById(event.url.split('/')[2]);
      });
  }

  getBoardById(boardId) {
    this.boardService.getBoardById(boardId).then((response) => {
      this.boardItems = response;
      this.titleService.setTitle(this.boardItems?.header);
    });
  }




}
