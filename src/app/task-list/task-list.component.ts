import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardItem } from 'src/models/card-item';
import { TaskList } from 'src/models/task-list';
import { BoardService } from 'src/services/board.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  @Input() taskList: TaskList;

  selectedCard: any = {};

  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private boardService: BoardService
  ) {}
  public isCollapsed = false;
  addCardForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
    //
    this.taskList.cards.map((item) => {
      item.id = this.boardService.createRandomId();
    });
  }

  // card ekleme formu
  createForm() {
    this.addCardForm = this.formBuilder.group({
      id: [0],
      header: [
        '',
        [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      ],
      content: [
        '',
        [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      ],
      color: ['#004a9f', Validators.required],
    });
  }

  onDrop(event) {
    this.sharedService.drop(event);
  }

  //yeni card ekleme
  addCardToTaskList() {
    if (this.addCardForm.valid) {
      var newCard: CardItem = Object.assign({}, this.addCardForm.value);
      if (!newCard.id) {
        newCard.id = this.boardService.createRandomId(); //yeni eklenen carda id verme
        this.taskList?.cards?.push(newCard);
      } else this.taskList.cards[this.findIndex(newCard)] = newCard;
      this.closePopup();
    } else
      this.toastrService.error(
        'Please fill all required fields.',
        'Missing Form'
      );
  }

  displayStyle = 'none';
  displayStyleForDelete = 'none';

  openPopupAndClearForm() {
    this.createForm();
    this.openPopup();
  }

  openPopupAndFillData(item) {
    this.selectedCard = item;
    this.addCardForm.patchValue(item);
    this.openPopup();
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  deleteCard() {
    var index = this.findIndex(this.selectedCard);
    if (index > -1) this.taskList.cards.splice(index, 1);
    this.closeDeletePopup();
  }

  closeDeletePopup() {
    this.displayStyleForDelete = 'none';
  }

  openDeletePopup() {
    this.displayStyleForDelete = 'block';
  }

  //card'ın index'ini bulma (guncelleme için)
  findIndex(item) {
    var index = -1;
    for (let i = 0; i < this.taskList.cards.length; i++) {
      if (this.taskList.cards[i].id === item.id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
