// ========== MENÚ TOGGLE ==========
const menuToggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("visible");
});

// ========== MANEJO DE TAREAS ==========
const taskList = document.querySelector("#task-list");
const taskForm = document.querySelector("#task-form");
const exportBtn = document.querySelector("#export-btn");
const importBtn = document.querySelector("#import-btn");
const importInput = document.querySelector("#import-file");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function renderTareas() {
  taskList.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const item = document.createElement("li");
    item.textContent = tarea;
    item.className = "tarea";
    item.onclick = () => {
      if (confirm("¿Eliminar esta tarea?")) {
        tareas.splice(index, 1);
        guardarTareas();
        renderTareas();
      }
    };
    taskList.appendChild(item);
  });
}

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const nuevaTarea = taskForm.tarea.value.trim();
  if (nuevaTarea) {
    tareas.push(nuevaTarea);
    guardarTareas();
    renderTareas();
    taskForm.reset();
  }
});

exportBtn.addEventListener("click", () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tareas, null, 2));
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "tareas.json");
  dlAnchor.click();
});

importBtn.addEventListener("click", () => {
  importInput.click();
});

importInput.addEventListener("change", () => {
  const file = importInput.files[0];
  if (file && file.type === "application/json") {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const datos = JSON.parse(e.target.result);
        if (Array.isArray(datos)) {
          tareas = datos;
          guardarTareas();
          renderTareas();
        } else {
          alert("El archivo no contiene una lista válida de tareas.");
        }
      } catch (err) {
        alert("Error al leer el archivo.");
      }
    };
    reader.readAsText(file);
  }
});

// ========== LOGIN CON CÓDIGO SECRETO ==========
const loginIcon = document.querySelector("#login-icon");
const secretPrompt = document.querySelector("#secret-prompt");

loginIcon.addEventListener("click", () => {
  const codigo = prompt("🔐 Ingrese el código secreto:");
  if (codigo === "InnovaPoki2526**") {
    const destino = confirm("¿Quieres ir a Poki?\nPresiona 'Cancelar' para CrazyGames")
      ? "https://poki.com"
      : "https://www.crazygames.com";
    window.location.href = destino;
  } else {
    alert("Código incorrecto.");
  }
});

// ========== INICIALIZACIÓN ==========
renderTareas();
