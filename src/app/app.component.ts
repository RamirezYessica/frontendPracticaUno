// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'frontend';
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './app.component.html'
// })

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './app.component.html'
})


export class AppComponent implements OnInit {

  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        //this.tasks = data;
        this.tasks = data.filter(task => !task.isCompleted);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const task: Task = {
      id: 0,
      title: this.newTaskTitle,
      isCompleted: false
    };

    this.taskService.createTask(task).subscribe(() => {
      this.newTaskTitle = '';
      this.loadTasks();
    });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}


