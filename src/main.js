import './style.css';
import { TaskStorage } from './storage/TaskStorage.js';
import { TaskService } from './services/TaskService.js';
import { TaskUI } from './ui/TaskUI.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar almacenamiento local (DIP)
  const storage = new TaskStorage();

  // 2. Inyectar almacenamiento en el servicio de negocio (SRP)
  const service = new TaskService(storage);

  // 3. Inyectar servicio en la interfaz de usuario
  const ui = new TaskUI(service);

  // 4. Arrancar los eventos y renderizar
  ui.init();
});