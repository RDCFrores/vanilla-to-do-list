import { getTasks, getStats, addTask, toggleTask, deleteTask, filterTasks } from './tasks.js';

let currentFilter = 'all';

function renderStats() {
  const statsDiv = document.getElementById('stats');
  const stats = getStats();
  statsDiv.textContent = `Total: ${stats.total} | Completadas: ${stats.completed} | Activas: ${stats.active}`;
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; 
  
  const filtered = filterTasks(currentFilter);
  
  if (filtered.length === 0) {
    taskList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No hay tareas para mostrar</p>';
    return;
  }
  
  filtered.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`.trim();
    
    taskDiv.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete-btn">${task.completed ? "Reactivar" : "Completar"}</button>
        <button class="delete-btn">Eliminar</button>
      </div>
    `;
    
    taskDiv.querySelector('.complete-btn').onclick = () => {
      toggleTask(task.id);
      updateScreen();
    };
    
    taskDiv.querySelector('.delete-btn').onclick = () => {
      deleteTask(task.id);
      updateScreen();
    };
    
    taskList.appendChild(taskDiv);
  });
}

function updateScreen() {
  renderTasks();
  renderStats();
}

window.onload = function() {
  document.getElementById('addBtn').onclick = () => {
    const input = document.getElementById('taskInput');
    const seAgrego = addTask(input.value);
    if (seAgrego) {
      input.value = '';
      updateScreen();
    }
  };
  
  document.getElementById('taskInput').onkeypress = function(e) {
    if (e.key === 'Enter') document.getElementById('addBtn').click();
  };
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      updateScreen();
    };
  });
  
  updateScreen();
};