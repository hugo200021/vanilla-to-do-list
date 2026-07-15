export class TaskStorage {
  constructor(key = 'tasks') {
    this.key = key;
  }

  get() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  save(tasks) {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }
}