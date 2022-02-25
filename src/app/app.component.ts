import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { BoardItem } from 'src/models/board-item';
import { BoardService } from 'src/services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kanban-board-project';
  constructor(){}

  ngOnInit(): void {
  }

  

}
