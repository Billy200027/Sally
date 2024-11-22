const prestamosURL = "https://docs.google.com/spreadsheets/d/1hK2R6G7-38p66nR0E6JXr1f7YrqKDGC7vNAb0uC5Uyg/gviz/tq?tqx=out:csv&sheet=prestamos";

// Función para cargar datos desde el CSV
async function cargarCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data.split("\n").map((row) => row.split(",").map((cell) => cell.replace(/['"]+/g, "").trim()));
}

// Función para cargar y mostrar los préstamos
async function cargarPrestamos() {
  const datos = await cargarCSV(prestamosURL);

  const tbody = document.querySelector("#tabla-prestamos tbody");
  tbody.innerHTML = "";

  // Iterar sobre los datos y agregarlos a la tabla
  datos.slice(1).forEach(([miembro, monto, interes, fecha]) => {
    if (miembro) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${miembro}</td>
        <td>${monto}</td>
        <td>${interes}</td>
        <td>${fecha}</td>
      `;
      tbody.appendChild(row);
    }
  });
}

// Cargar los datos al cargar la página
if (document.getElementById("tabla-prestamos")) {
  cargarPrestamos();
}

// Abrir y cerrar el menú lateral
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});