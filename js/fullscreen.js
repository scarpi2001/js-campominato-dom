var fullscreenButton = document.getElementById("fullscreenButton");
var isFullscreen = false; // Variabile di stato per tenere traccia della modalità schermo intero

// Verifica se l'API fullscreen è supportata dal browser
if (document.documentElement.requestFullscreen) {
  fullscreenButton.style.display = "block"; // Mostra il pulsante se l'API è supportata
}

// Aggiungi un gestore di eventi al pulsante
fullscreenButton.addEventListener("click", function () {
  if (!isFullscreen) {
    // Entra in modalità schermo intero
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  } else {
    // Esci dalla modalità schermo intero
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});

// Aggiungi un gestore di eventi per l'evento "fullscreenchange"
document.addEventListener("fullscreenchange", function () {
  isFullscreen = !isFullscreen; // Inverti il valore di isFullscreen quando cambia la modalità schermo intero

  if (isFullscreen) {
    fullscreenButton.innerHTML = "Esci da Schermo Intero";
  } else {
    fullscreenButton.innerHTML = "Schermo Intero";
  }
});
