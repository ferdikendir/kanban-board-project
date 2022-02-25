import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardItem } from 'src/models/card-item';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() item?: CardItem;
  @Output() onUpdateCard = new EventEmitter();
  @Output() onDeleteCard = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
}
