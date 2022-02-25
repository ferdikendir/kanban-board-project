import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { BoardComponent } from './board/board.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BoardService } from 'src/services/board.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayModule} from '@angular/cdk/overlay';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TaskListComponent,
    BoardComponent,
    SideNavMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    ToastrModule.forRoot(),
  ],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
