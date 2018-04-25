import {Component} from '@angular/core';
import { Todo } from './todo';
import {TodoDataService} from './todo-data.service';
import {IMyDpOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {

  priorities = ['0. None', '4. Low', '3. Medium', '2. High', '1. Show Stopper'];
  selectPriority = this.priorities[0];


  newTodo: Todo = new Todo();
  currentDate: Date = new Date();

  private selDate: IMyDate = {  month: 0, day: 0, year: 0};

  colorDate: string = '';
  tipContent: string = '';

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
    minYear: this.currentDate.getFullYear(),
    markCurrentDay: true,
    height: '25px',
      width: '140px',
      inline: false,
      selectionTxtFontSize: '16px'

};

  constructor(private todoDataService: TodoDataService) {
    const d: Date = new Date();
    this.selDate = { month: d.getMonth() + 1, day: d.getDate(), year: d.getFullYear()};
    
    
  }

onDateChanged(event: IMyDateModel, todo: Todo) {
  let d: Date = new Date(event.jsdate.getTime());

  if(d < this.getDate() ){

    todo.colorDate = 'OD';
    this.tipContent = 'Overdue.'
  } else{ 
   
    todo.colorDate = 'DS';
    this.tipContent = 'Due Soon'
}
}

getColor(styleSet) { 
  let myStyles;
	if(styleSet == 'D') {
	  myStyles = {
		'background-color': 'grey',
    };
  }else if(styleSet == 'OD') {
    myStyles = {
      'background-color': 'red',
      };
  }else if(styleSet == 'DS') {
    myStyles = {
      'background-color': 'yellow',
      };
  }else {
    myStyles = {
      'background-color': 'grey',
      };
  }  
    return myStyles;
}


getDate(): Date {
  return this.currentDate;
}

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }
  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }
  updateTodbyID(todo) {
    this.todoDataService.updateTodoById(todo.id, todo);
  }

  
}

