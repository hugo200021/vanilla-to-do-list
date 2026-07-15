import { Task } from '../models/Task.js';

export class TaskService {
  constructor(storage) {
    this.storage = storage;
    this.tasks = this.loadTasks();
    this.currentFilter = 'all';
  }

  loadTasks() {
    const rawTasks = this.storage.get();
    return rawTasks.map(t => new Task(t.id, t.text, t.completed, t.createdAt));
  }

  getTasks() {
    if (this.currentFilter === 'active') {
      return this.tasks.filter(task => !task.completed);
    }
    if (this.currentFilter === 'completed') {
      return this.tasks.filter(task => task.completed);
    }
    return this.tasks;
  }

  setFilter(filter) {
    this.currentFilter = filter;
  }

  getFilter() {
    return this.currentFilter;
  }

  addTask(text) {
    const trimmedText = text.trim();
    if (!trimmedText) {
      throw new Error('Por favor escribe una tarea');
    }

    const nextId = this.tasks.length > 0 
      ? Math.max(...this.tasks.map(t => t.id)) + 1 
      : 1;

    const newTask = new Task(nextId, trimmedText);
    this.tasks.push(newTask);
    this.storage.save(this.tasks);
    return newTask;
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.toggle();
      this.storage.save(this.tasks);
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.storage.save(this.tasks);
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;

    return { total, completed, active };
  }
}