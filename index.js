const slyURL = "https://docs.google.com/spreadsheets/d/1hK2R6G7-38p66nR0E6JXr1f7YrqKDGC7vNAb0uC5Uyg/gviz/tq?tqx=out:csv&sheet=Sly";

// Función para cargar datos del CSV
async function cargarCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data.split("\n").map((row) => row.split(",").map((cell) => cell.trim()));
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

// Carga inicial de datos
document.addEventListener("DOMContentLoaded", cargarResumen);
