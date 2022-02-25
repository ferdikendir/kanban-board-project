import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BoardItem } from 'src/models/board-item';
import { CardItem } from 'src/models/card-item';
import { TaskListItem } from 'src/models/task-list-item';
import { BoardService } from 'src/services/board.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  @Input() item: TaskListItem;

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
    this.item.listItems.map((item) => {
      item.id = this.boardService.createRandomId();
    });
  }

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

  addTaskList() {
    if (this.addCardForm.valid) {
      var addItem: CardItem = Object.assign({}, this.addCardForm.value);
      if (!addItem.id) {
        addItem.id = this.boardService.createRandomId(); //yeni eklenen carda id verme
        this.item?.listItems?.push(addItem);
      } else this.item.listItems[this.findIndex(addItem)] = addItem;
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
    if (index > -1) this.item.listItems.splice(index, 1);
    this.closeDeletePopup();
  }

  closeDeletePopup() {
    this.displayStyleForDelete = 'none';
  }

  openDeletePopup() {
    this.displayStyleForDelete = 'block';
  }

  findIndex(item) {
    var index = -1;
    for (let i = 0; i < this.item.listItems.length; i++) {
      if (this.item.listItems[i].id === item.id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
