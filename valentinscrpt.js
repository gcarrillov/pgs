const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');

document.addEventListener("DOMContentLoaded", () => {
    let audio = document.getElementById("background-audio");

    // Intentar reproducir automáticamente el audio
    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Reproducción automática activada.");
        }).catch(error => {
            console.log("Autoplay bloqueado: esperando interacción...");
        });
    }
});

// Si el navegador bloquea el autoplay, reproducirlo al primer clic en la página
document.addEventListener("click", () => {
    let audio = document.getElementById("background-audio");
    if (audio.paused) {
        audio.play();
    }
});

document.addEventListener('click', (e) => {
    if (
        e.target.matches(".envelope") || 
        e.target.matches(".tap-right") || 
        e.target.matches(".tap-left") || 
        e.target.matches(".heart")
    ) {
        envelope.classList.toggle('flap');
        
        if (!letter.classList.contains('opened')) {
            setTimeout(() => {
                letter.classList.add('letter-opening');

                setTimeout(() => {
                    letter.classList.remove('letter-opening');
                    letter.classList.add('opened');
                }, 500);
            }, 1000);
        }
    } else if (e.target.matches(".envelope *") ) {
        envelope.classList.remove('flap');
        if (letter.classList.contains("opened")) {
            letter.classList.add("closing-letter");
            setTimeout(() => {
                letter.classList.remove("closing-letter");
                letter.classList.remove("opened");
            }, 500);
        }
    }
});


