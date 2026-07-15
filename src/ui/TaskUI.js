export class TaskUI {
  constructor(taskService) {
    this.service = taskService;

    // Cache de elementos del DOM
    this.taskInput = document.getElementById('taskInput');
    this.addBtn = document.getElementById('addBtn');
    this.taskList = document.getElementById('taskList');
    this.statsDiv = document.getElementById('stats');
    this.filterButtons = document.querySelectorAll('.filter-btn');
  }

  init() {
    // Vincular Event Listeners usando buenas prácticas (no onclick directo)
    this.addBtn.addEventListener('click', () => this.handleAddTask());
    
    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleAddTask();
      }
    });

    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.handleFilterChange(filter);
      });
    });

    // Renderizado Inicial
    this.render();
  }

  render() {
    this.renderTasks();
    this.renderStats();
    this.renderActiveFilterButton();
  }

  renderTasks() {
    this.taskList.innerHTML = '';
    const filteredTasks = this.service.getTasks();

    if (filteredTasks.length === 0) {
      this.taskList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No hay tareas para mostrar</p>';
      return;
    }

    filteredTasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;

      taskDiv.innerHTML = `
        <span>${task.text}</span>
        <div class="task-buttons">
          <button class="complete-btn" data-id="${task.id}">
            ${task.completed ? "Reactivar" : "Completar"}
          </button>
          <button class="delete-btn" data-id="${task.id}">Eliminar</button>
        </div>
      `;

      // Eventos individuales
      taskDiv.querySelector('.complete-btn').addEventListener('click', () => {
        this.service.toggleTask(task.id);
        this.render();
      });

      taskDiv.querySelector('.delete-btn').addEventListener('click', () => {
        this.service.deleteTask(task.id);
        this.render();
      });

      this.taskList.appendChild(taskDiv);
    });
  }

  renderStats() {
    const { total, completed, active } = this.service.getStats();
    this.statsDiv.textContent = `Total: ${total} | Completadas: ${completed} | Activas: ${active}`;
  }

  renderActiveFilterButton() {
    const currentFilter = this.service.getFilter();
    this.filterButtons.forEach(button => {
      if (button.getAttribute('data-filter') === currentFilter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  handleAddTask() {
    try {
      this.service.addTask(this.taskInput.value);
      this.taskInput.value = '';
      this.render();
    } catch (error) {
      alert(error.message);
    }
  }

  handleFilterChange(filter) {
    this.service.setFilter(filter);
    this.render();
  }
}