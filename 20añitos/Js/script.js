// ================== CARGA Y ANIMACIÓN DEL SVG ==================
fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    const allPaths = Array.from(svg.querySelectorAll('path'));

    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition =
          `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s,
           fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;

        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 600;

      setTimeout(() => {
        svg.classList.add('move-and-scale');

        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          showCountdown();
          playBackgroundMusic();
        }, 1400);

      }, totalDuration);

    }, 50);

    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });

    heartPaths.forEach(path => path.classList.add('animated-heart'));
  });


// ================== UTILIDAD URL ==================
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}


// ================== TEXTO  ==================
function showDedicationText() {

  let text = getURLParam('text');

  if (!text) {
    text = `Cuando el reloj marque las 12, no será solo un nuevo minuto del día…

será un instante que me invite a mirar hacia atrás y agradecer por todo el camino que hemos recorrido juntos.

Hemos atravesado días luminosos y también días nublados. Momentos que nos hicieron sonreír y otros que nos hicieron aprender. Pero en todos, siempre hubo algo que se mantuvo firme: nuestra decisión de seguir caminando uno al lado del otro.

Quiero que usted sepa que, para mí, siempre será importante velar por su futuro, por mi futuro y, sobre todo, por ese futuro que construimos cuando pensamos en nosotros.

Gracias por quedarse.
Gracias por su paciencia silenciosa, por su esfuerzo constante, por todo lo que hace incluso cuando nadie más lo nota.

Sé que usted carga sus propios cambios, sus propias luchas, sus propios problemas… y aun así siempre encuentra la forma de darme mi espacio, de respetarme, de comprenderme.

Estoy profundamente orgulloso de usted. De su seguridad. De su madurez. De la mujer que es y de la mujer que sigue creciendo cada día.

A veces siento que le debo más de lo que logro expresar con palabras.

Solo deseo que sigamos así… aprendiendo juntos, creciendo juntos, caminando juntos.

La amo muchísimo.

Y agradezco, con el corazón en la mano, el tenerla en mi vida.`;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }

  const container = document.getElementById('dedication-text');
  container.classList.add('typing');

  let i = 0;

  function humanDelay(char) {
    if (char === '.' || char === '…') return 250;
    if (char === ',') return 120;
    if (char === '\n') return 350;
    return 25 + Math.random() * 15;
  }

  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      const delay = humanDelay(text[i - 1]);
      i++;
      setTimeout(type, delay);
    } else {
      setTimeout(showSignature, 800);
    }
  }

  type();
}


// ================== FIRMA ==================
function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');

  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "con amor para mi tati <3";
  signature.classList.add('visible');
}


// ================== OBJETOS FLOTANTES ==================
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;

  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';

    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;

    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;

    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform =
        `translate(${drift}px, -110vh)
         scale(${0.8 + Math.random() * 0.6})
         rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => el.remove(), duration + 2000);

    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }

  spawn();
}

// ================== MÚSICA ==================
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  // Canción fija SIEMPRE
  audio.src = 'Music/Ladrona.mp3';
  audio.loop = true;
  audio.volume = 0;
  audio.muted = true;

  // Intentar autoplay silencioso
  audio.play().catch(() => {});

  function enableSound() {
    audio.muted = false;

    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.7) {
        vol += 0.05;
        audio.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 120);

    document.removeEventListener('click', enableSound);
    document.removeEventListener('touchstart', enableSound);
  }

  document.addEventListener('click', enableSound);
  document.addEventListener('touchstart', enableSound);
}

window.addEventListener('DOMContentLoaded', playBackgroundMusic);

window.addEventListener('DOMContentLoaded', playBackgroundMusic);