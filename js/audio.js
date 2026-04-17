document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("bg-music");
    const button = document.getElementById("musicToggle");
    const icon = document.getElementById("musicIcon");

    if (!music || !button || !icon) return;

    music.volume = 0.07;
    
    // Forzamos que NO esté muteado internamente
    music.muted = false;
    
    // Función para intentar reproducir
    const playMusic = () => {
        music.play().then(() => {
            // Si arranca, quitamos el evento para que no se ejecute siempre
            document.removeEventListener("click", playMusic);
            document.removeEventListener("keydown", playMusic);
        }).catch(error => {
            console.log("El navegador bloqueó el inicio automático, esperando interacción.");
        });
    };

    // Intentar sonar al primer clic o tecla que toque el usuario
    document.addEventListener("click", playMusic);
    document.addEventListener("keydown", playMusic);

    // Lógica del botón Toggle (corregida)
    button.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que el clic del botón dispare otros eventos
        if (music.paused) {
            music.play();
            icon.classList.replace("bi-volume-mute", "bi-volume-up");
        } else {
            music.pause();
            icon.classList.replace("bi-volume-up", "bi-volume-mute");
        }
    });
});