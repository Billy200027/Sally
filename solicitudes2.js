// Lógica del menú lateral
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");


// Inicialización de solicitudes (mismo código anterior para almacenar y filtrar)
const solicitudesKey = "solicitudes";
const solicitudes = JSON.parse(localStorage.getItem(solicitudesKey)) || [];
function cargarSolicitudes() {
  const solicitudes = JSON.parse(localStorage.getItem(solicitudesKey)) || [];
  const tbody = document.querySelector("#tabla-solicitudes tbody");
  tbody.innerHTML = "";

  solicitudes.forEach(({ nombre, monto, meses, fecha }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nombre}</td>
      <td>${monto}</td>
      <td>${meses}</td>
      <td>${new Date(fecha).toLocaleDateString()}</td>
    `;
    tbody.appendChild(row);
  });

  filtrarSolicitudes();
}

function agregarSolicitud(sol) {
  const tbody = document.querySelector("#tabla-solicitudes tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${sol["nombre"]}</td>
    <td>${sol["monto"]}</td>
    <td>${sol["meses"]}</td>
    <td>${new Date( sol["fecha"]).toLocaleDateString()}</td>
  `;
  tbody.appendChild(row);
}
function guardarSolicitud(solicitud) {
  const solicitudes = JSON.parse(localStorage.getItem(solicitudesKey)) || [];
  solicitudes.push(solicitud);
  localStorage.setItem(solicitudesKey, JSON.stringify(solicitudes));
}

function filtrarSolicitudes() {
  const solicitudes = JSON.parse(localStorage.getItem(solicitudesKey)) || [];
  const ahora = Date.now();
  const tresDiasEnMilisegundos = 3 * 24 * 60 * 60 * 1000;

  const solicitudesActualizadas = solicitudes.filter(({ fecha }) => {
    const diferencia = ahora - new Date(fecha).getTime();
    return diferencia <= tresDiasEnMilisegundos;
  });

  localStorage.setItem(solicitudesKey, JSON.stringify(solicitudesActualizadas));
  cargarSolicitudes();
}

document.querySelector("#form-solicitudes").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const monto = document.querySelector("#monto").value.trim();
  const meses = document.querySelector("#meses").value.trim();

  if (nombre && monto && meses) {
    const nuevaSolicitud = {
      nombre,
      monto,
      meses,
      fecha: new Date().toISOString(),
    };

    guardarSolicitud(nuevaSolicitud);
    agregarSolicitud(nuevaSolicitud);
    e.target.reset();
  }
});

cargarSolicitudes();