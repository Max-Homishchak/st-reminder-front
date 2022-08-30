import { Component, OnInit} from '@angular/core';
import { TaskService } from './task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Visitor } from './visitor';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  public tasks: Task[] = [];

  visitor!: Visitor;

  deleteTask: Task | undefined | null;
  
  constructor(private taskService: TaskService) {}

  public sendCode(saveForm: NgForm) {

    document.getElementById('save-visitor-form')?.click();

    this.visitor = saveForm.value;
    this.visitor.tasks = this.tasks;

    this.taskService.sendCode(this.visitor.email).subscribe(
      (response: void) => {
        this.onOpenModal(null, 'confirm');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    saveForm.reset();
  }

  public onAddTask(addForm: NgForm): void{

    document.getElementById('add-task-form')?.click();

    this.tasks.push(addForm.value);

    this.sortTasks(this.tasks);
      
    addForm.reset();
  }

  public onDeleteEmployee(task: String | undefined, time: string | undefined): void{

    let taskToDelete = this.tasks.find((obj) => {
      return obj.task === task && obj.time === time;
    });
    
    if (taskToDelete !== undefined) {
    
      let index = this.tasks.indexOf(taskToDelete);

      delete this.tasks[index];
    }
    
    const result = this.tasks.filter((element): element is Task => {
      return element !== null;
    });

    this.tasks = result;
  }

  public sendForCheck(confirmForm: NgForm) {

    document.getElementById('save-visitor-form')?.click();

    this.taskService.checkCode(this.visitor.email, confirmForm.value['verificationCode']).subscribe(
      (response: void) => {
        this.saveVisitor(this.visitor);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ); 
  }

  public onOpenModal(task: Task | null, mode: string): void{

    const container = document.getElementById('mainContainer');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    console.log(mode);

    if(mode === 'add') {
      button.setAttribute('data-target', '#addTaskModal')
    }else if(mode === 'delete') {
      this.deleteTask = task;
      button.setAttribute('data-target', '#deleteTaskModal')
    }else if(mode === 'save') {
      button.setAttribute('data-target', '#saveVisitorModal')
    }else if(mode === 'confirm') {
      button.setAttribute('data-target', '#confirmModal')
    }

    container?.appendChild(button);
    button.click();
  }

  private saveVisitor(visitor: Visitor): void{

    this.taskService.add(this.visitor).subscribe(
      (response: Visitor) => {
        this.refresh();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

    this.onOpenModal(null, "confirm");
  }

  private sortTasks(tasks: Task[]): void{
    var sortedTasks = tasks.sort((n1, n2) => {
      if(n1.time > n2.time){
        return 1;
      }

      if(n1.time < n2.time){
        return -1;
      }

      return 0;
    });

    this.tasks = sortedTasks;
  }

  private refresh(): void {
    window.location.reload();
  } 
}
