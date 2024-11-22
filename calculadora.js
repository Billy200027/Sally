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

// Lógica de la calculadora
const formCalculadora = document.getElementById("form-calculadora");
const interesSpan = document.getElementById("interes");
const totalPagarSpan = document.getElementById("total-pagar");
const cuotaMensualSpan = document.getElementById("cuota-mensual");

formCalculadora.addEventListener("submit", (e) => {
  e.preventDefault();

  const monto = parseFloat(document.getElementById("monto").value);
  const meses = parseInt(document.getElementById("meses").value);

  if (!isNaN(monto) && !isNaN(meses) && meses > 0) {
    // Calcula el interés
    const interes = monto * 0.03 * meses;

    // Calcula el total a pagar
    const totalPagar = monto + interes;

    // Calcula la cuota mensual
    const cuotaMensual = totalPagar / meses;

    // Muestra los resultados
    interesSpan.textContent = `$${interes.toFixed(2)}`;
    totalPagarSpan.textContent = `$${totalPagar.toFixed(2)}`;
    cuotaMensualSpan.textContent = `$${cuotaMensual.toFixed(2)}`;
  } else {
    alert("Por favor, ingresa valores válidos para el monto y los meses.");
  }
});

