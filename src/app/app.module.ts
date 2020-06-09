import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todos/components/todo-list/todo-list.component';
import { DashboardComponent } from './todos/components/dashboard/dashboard.component';
import { rootReducer, INITIAL_STATE, IAppState } from './store';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { MessagingComponent } from './messaging/component/messaging.component';
import { TodosService } from './todos/todos.service';
import { MessagingService } from './messaging/messaging.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DashboardComponent,
    MessagingComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [TodosService, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    const enhancer = isDevMode() ? [devToolsEnhancer({})] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancer);
  }
}
