export class Task {
  constructor(id, text, completed = false, createdAt = new Date().toISOString()) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  toggle() {
    this.completed = !this.completed;
  }
}