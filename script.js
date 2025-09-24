// Menú lateral
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('visible');
});

// Gestor de tareas
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function renderTareas() {
  taskList.innerHTML = '';
  tareas.forEach((t, i) => {
    const li = document.createElement('li');
    li.textContent = t;
    li.onclick = () => {
      if (confirm('¿Eliminar tarea?')) {
        tareas.splice(i, 1);
        saveTareas();
      }
    };
    taskList.appendChild(li);
  });
}

function saveTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
  renderTareas();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const tarea = form.tarea.value.trim();
  if (tarea) {
    tareas.push(tarea);
    form.reset();
    saveTareas();
  }
});

renderTareas();

// Exportar tareas
document.getElementById('export-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(tareas)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tareas.json';
  a.click();
  URL.revokeObjectURL(url);
});

// Importar tareas
document.getElementById('import-btn').addEventListener('click', () => {
  document.getElementById('import-file').click();
});

document.getElementById('import-file').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      if (Array.isArray(data)) {
        tareas = data;
        saveTareas();
      }
    } catch {
      alert("Error al importar archivo");
    }
  };
  reader.readAsText(file);
});

// Login secreto
document.getElementById('login-icon').addEventListener('click', () => {
  const clave = prompt("Ingresa el código secreto:");
  if (clave === "InnovaPoki2526**") {
    const destino = confirm("¿Ir a Poki (Aceptar) o CrazyGames (Cancelar)?");
    const url = destino ? "https://poki.com" : "https://www.crazygames.com";
    window.location.href = url;
  } else {
    alert("Código incorrecto.");
  }
});
