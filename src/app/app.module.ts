import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ChangeComponent } from './change/change.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
