import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, Observable} from 'rxjs';
import { delay, first, mergeMap } from 'rxjs/operators';
import { BoardService } from 'src/services/board.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BoardItem } from 'src/models/board-item';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss'],
})
export class SideNavMenuComponent implements OnInit {
  addBoardForm: FormGroup;

  boards$: Observable<BoardItem[]> = from(this.boardService.getBoards());


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  constructor(
    private boardService: BoardService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private loginService: LoginService,
    private route: Router, private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    if(!this.loginService.getUser()) this.route.navigate(['login']);
    this.createForm();
    localStorage.setItem('last-visited-projects', JSON.stringify(this.lastVisited));
    this.boards$
      .pipe(
        mergeMap((item) => item),
        first()
      )
      .subscribe((data: BoardItem) => {
        this.goTo(data);
      });
  } 
  
  //ekran boyutu 1200px veya daha buyukse mat-sidenav kalıcı olacak
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1200px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  createForm(){
    this.addBoardForm = this.formBuilder.group({
      id: [0],
      header: ['', [Validators.required,
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        linkName: ['', [Validators.required,
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      link: [Validators.required,
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
    });
  }

  displayStyle = 'none';

  openPopup() {
    this.addBoardForm.reset();
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  addBoard() {
    if (this.addBoardForm.valid) {
      var addItem = Object.assign({}, this.addBoardForm.value);
      addItem.taskLists = this.getBlankTaskList();
      this.boardService.addNewBoard(addItem);
      this.sonGezilenlereEkle(addItem);
      this.boards$ = from(this.boardService.getBoards());
      this.closePopup();
    } else {
      this.toastrService.error(
        'Please fill all required fields.',
        'Missing Form'
      );
    }
  }

  //yeni eklenen bard için tasklist oluşturma
  getBlankTaskList() {
    return [
      {
        header: 'Backlog',
        color: '#2C3333',
        cards: [],
        isAddable: true,
      },
      {
        header: 'To Do',
        color: '#2C3333',
        cards: [],
        isAddable: true,
      },
      {
        header: 'In Progress',
        color: '#2C3333',
        cards: [],
      },
      {
        header: 'Done',
        color: '#2C3333',
        cards: [],
      },
    ];
  }
  
  goTo(item: BoardItem) {
    this.sonGezilenlereEkle(item);
    this.route.navigateByUrl('/boards/' + item.id);
  }

  lastVisited: BoardItem[] = [];
  sonGezilenlereEkle(item: BoardItem){
    this.lastVisited = JSON.parse(localStorage.getItem('last-visited-projects')|| '{}');
    this.lastVisited?.forEach(element => {
      if(element.id == item.id){
        this.lastVisited.splice(this.lastVisited.indexOf(element), 1);
      }
    });
    this.lastVisited.unshift(item)
    if(this.lastVisited.length > 5) this.lastVisited.pop();

    localStorage.setItem('last-visited-projects', JSON.stringify(this.lastVisited));
  }
}
