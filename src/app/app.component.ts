import { CommonModule } from '@angular/common';
import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number,
  text: string,
  completed: boolean,
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
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
        text: this.taskText(),
        completed: false,
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

  toggleComplete(task: any) {
    this.tasks.update(t => 
      t.map(item =>
        item.id === task.id ? { ...item, completed: !item.completed } : item
      )
    );
  }

}
