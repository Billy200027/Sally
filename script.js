const slyURL = "https://docs.google.com/spreadsheets/d/114PEyFvKzbdqsyqOrrh8r07utzxNLI4yRrxJ5THYCO8/gviz/tq?tqx=out:csv&sheet=Sly";
const depositosURL = "https://docs.google.com/spreadsheets/d/114PEyFvKzbdqsyqOrrh8r07utzxNLI4yRrxJ5THYCO8/gviz/tq?tqx=out:csv&sheet=depositos";


// Función para cargar datos del CSV
async function cargarCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data.split("\n").map((row) => row.split(",").map((cell) => cell.replace(/['"]+/g, "").trim()));
}

// Función para cargar la tabla de resumen
async function cargarResumen() {
  const datos = await cargarCSV(slyURL);

  const tbody = document.querySelector("#tabla-resumen tbody");
  tbody.innerHTML = "";

  datos.slice(1).forEach(([miembro, capital, interes, total]) => {
    if (miembro) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${miembro}</td>
        <td>${capital}</td>
        <td>${interes}</td>
        <td>${total}</td>
      `;
      tbody.appendChild(row);
    }
  });
}

// Función para cargar la tabla de depósitos con filtro dinámico
async function cargarDepositos() {
  const datos = await cargarCSV(depositosURL);

  const tbody = document.querySelector("#tabla-depositos tbody");
  const filtroSelect = document.getElementById("filter-select");
  const nombresUnicos = new Set();

  tbody.innerHTML = "";

  datos.slice(1).forEach(([miembro, capital, interes, descripcion, fecha]) => {
    if (miembro) {
      nombresUnicos.add(miembro); // Guardar nombres únicos para el filtro

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${miembro}</td>
        <td>${capital}</td>
        <td>${interes || ""}</td>
        <td>${descripcion || ""}</td>
        <td>${fecha}</td>
      `;
      tbody.appendChild(row);
    }
  });
  
  
  // Generar las opciones del filtro dinámicamente
  filtroSelect.innerHTML = '<option value="Todos">Todos</option>';
  nombresUnicos.forEach((nombre) => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    filtroSelect.appendChild(option);
  });

  // Evento para filtrar los datos
  filtroSelect.addEventListener("change", (e) => {
    const filtro = e.target.value;
    tbody.innerHTML = "";

    datos.slice(1).forEach(([miembro, capital, interes, descripcion, fecha]) => {
      if (miembro && (filtro === "Todos" || miembro === filtro)) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${miembro}</td>
          <td>${capital}</td>
          <td>${interes || ""}</td>
          <td>${descripcion || ""}</td>
          <td>${fecha}</td>
        `;
        tbody.appendChild(row);
      }
    });
  });
}

// Inicialización de la tabla correspondiente
if (document.getElementById("tabla-resumen")) {
  cargarResumen();
} else if (document.getElementById("tabla-depositos")) {
  cargarDepositos();
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