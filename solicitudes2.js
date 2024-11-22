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

const url = 'https://script.google.com/macros/s/AKfycbxSzNyQIuhrIzpGucSpq0ne5kVeJpRDfijKPSnn4loj9sV53yybnR_LATsSZ5XOe99W/exec';
const tbody = document.querySelector("#tabla-solicitudes tbody");
async function cargarSolicitudes(){
  
  const request = await fetch(url);
  const json = await request.json();
  if (!json["success"]){
    return
  }
  json["records"].forEach(([ nombre, monto, meses, fecha ]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nombre}</td>
      <td>${monto}</td>
      <td>${meses}</td>
      <td>${new Date(fecha).toLocaleDateString()}</td>
    `;
    tbody.appendChild(row);

  });
  console.log(json)

}
async function agregarSolicitud(soli){

  await fetch(url, {
    redirect:"follow",
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(soli),
  }).then( async response =>{
    const json = await response.json();
    if(!json["success"]) return

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${soli.nombre}</td>
      <td>${soli.monto}</td>
      <td>${soli.meses}</td>
      <td>${new Date(fecha).toLocaleDateString()}</td>
    `;
    tbody.appendChild(row);
  }

  )
  .catch(error => console.error("Error:", error));
 

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
    };

    agregarSolicitud(nuevaSolicitud);
  }
});

cargarSolicitudes();