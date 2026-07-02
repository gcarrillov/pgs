// Carta
const regalo = document.querySelector(".regalo");
const regalos = document.querySelector(".regalos");
const modalCarta = document.getElementById("modalCarta");


regalo.addEventListener("click", () => {
  modalCarta.classList.add("activo");
});

regalos.addEventListener("click", () => {
  modalCarta.classList.add("activo");
});

modalCarta.addEventListener("click", () => {
  modalCarta.classList.remove("activo");
});

// Todo Oscuro + Soplido + Canción
const overlay = document.querySelector(".overlay");
const soplido = document.getElementById("soplido");
const cancion = document.getElementById("cancion");
const llama = document.querySelector(".llama");

llama.addEventListener("click", () => {
  soplido.currentTime = 0;
  soplido.play();

  llama.style.animation = "apagar 0.5s forwards"; // forwards -> Ultimo frame (to)

  setTimeout(() => {
    cancion.currentTime = 0;
    cancion.play();
    overlay.classList.add("hidden");
  }, 1000);
});
/*======= GALERÍA DEL PORTARRETRATO ===================*/

const portaretrato = document.getElementById("abrirGaleria");

const modalGaleria = document.getElementById("modalGaleria");

const album = modalGaleria.querySelector(".album");

portaretrato.addEventListener("click",()=>{

    modalGaleria.classList.add("activa");

});

modalGaleria.addEventListener("click",()=>{

    modalGaleria.classList.remove("activa");

});

album.addEventListener("click",(e)=>{

    e.stopPropagation();

});