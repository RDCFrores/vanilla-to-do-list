import { storage } from './storage.js';

let tasks = storage.get('tasks');

export function getTasks() {
  return tasks;
}

export function generateId() {
  return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

export function getStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  return {
    total,
    completed,
    active: total - completed
  };
}

export function addTask(text) {
  if (text.trim() === '') {
    alert('Por favor escribe una tarea');
    return false;
  }
  
  const newTask = {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  storage.set('tasks', tasks);
  return true;
}

export function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  storage.set('tasks', tasks);
}

export function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  storage.set('tasks', tasks);
}

export function filterTasks(currentFilter) {
  if (currentFilter === 'active') return tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}