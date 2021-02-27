import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {

  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName: string;
  tasks: Task[] = [
    { name: 'task0', stage: 0 },
    { name: 'task1', stage: 0 },
    { name: 'task2', stage: 0 },
    { name: 'task3', stage: 1 },
  ];
  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.

    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  createTask(task) {
    this.tasks.push({ name: task, stage: 0 });
    this.taskName = '';
    this.configureTasksForRendering();
  }

  // forword task
  forwordTask(index, i) {
    this.stagesTasks[i][index].stage = this.stagesTasks[i][index].stage + 1;
    this.configureTasksForRendering();
  }

  // backword a task
  backWord(index, i) {
    this.stagesTasks[i][index].stage = this.stagesTasks[i][index].stage - 1;
    this.configureTasksForRendering();
  }

  // delete a task
  deleteTask(index, i) {
    this.stagesTasks[i].splice(index,1);
    this.tasks.splice(i,1)
    this.configureTasksForRendering();
  }

}

interface Task {
  name: string;
  stage: number;
}