// Duración de la barra de progreso
const splashDuration = 6000; // 6 segundos

// Redirigir a la página principal después de que termine la animación
function redirectToHome() {
    window.location.href = 'index.html'; // Cambia a tu página principal
}

// Simular el progreso de carga
const progressBar = document.querySelector('.progress-bar');
progressBar.style.animation = 'fillProgressBar 6s ease-in-out forwards';

// Redirigir después de la duración del splash
setTimeout(redirectToHome, splashDuration);
