import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number,
  text: string,
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks = signal<Task[]>([]);
  taskText = model('');

  addTask() {
    this.tasks.update(tasks => {
      const taskId = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;

      tasks.push({
        id: taskId,
        text: this.taskText()
      });
      return tasks
    })
    this.taskText.set('')
  }

  removeTask(index: number) {
    this.tasks.update(tasks => {
      tasks.splice(index, 1)
      return tasks
    })
  }

}
