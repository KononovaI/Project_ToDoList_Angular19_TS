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

  editIndex = signal<number | null>(null);
  editText = model('');

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

  editTask(index: number) {
    const task = this.tasks()[index];
    this.editIndex.set(index)
    this.editText.set(task.text);
  }

  saveTask(){
    const index = this.editIndex();
    if (index === null) return;

    this.tasks.update(tasks => {
      const updated = [...tasks];
      updated[index] = { ...updated[index], text: this.editText()
      };
    return updated;
    });

    this.editIndex.set(null);
    this.editText.set('');
  }

}
