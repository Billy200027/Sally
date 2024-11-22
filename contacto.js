// Lógica del menú lateral
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Lista de contactos
const contactos = [
  { nombre: "Billy", telefono: "+593987933789", rol: "Organizador" },
  { nombre: "Andrea", telefono: "593987654321", rol: "Grupo A" },
  { nombre: "Carlos", telefono: "593912345678", rol: "Colaborador" },
];

// Cargar contactos en la tabla
function cargarContactos() {
  const tbody = document.querySelector("#tabla-contactos tbody");
  tbody.innerHTML = ""; // Limpiar tabla antes de cargar

  contactos.forEach(({ nombre, telefono, rol }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nombre}</td>
      <td><a href="https://wa.me/${telefono}" target="_blank">${telefono}</a></td>
      <td>${rol}</td>
    `;
    tbody.appendChild(row);
  });
}

cargarContactos();