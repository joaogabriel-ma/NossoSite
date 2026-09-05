// Header "liquid glass" — fica mais opaco/desfocado depois que a página rola
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("topo");
  if (header) {
    const toggleGlass = function () {
      if (window.scrollY > 60) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    toggleGlass();
    window.addEventListener("scroll", toggleGlass, { passive: true });
  }
});

// Menu mobile — abre/fecha e fecha ao clicar em um link
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});

// Contador de tempo juntos — atualiza a cada segundo, para sempre
document.addEventListener("DOMContentLoaded", function () {
  // TROQUE AQUI se precisar ajustar a data/hora exata do pedido oficial
  // Formato: ano, mês (0 = janeiro, então junho = 5), dia, hora, minuto, segundo
  const inicio = new Date(2023, 5, 12, 20, 0, 0);

  const campos = {
    anos: document.getElementById("anos"),
    meses: document.getElementById("meses"),
    dias: document.getElementById("dias"),
    horas: document.getElementById("horas"),
    minutos: document.getElementById("minutos"),
    segundos: document.getElementById("segundos"),
  };

  if (!campos.anos) return;

  function doisDigitos(numero) {
    return String(numero).padStart(2, "0");
  }

  function atualizarContador() {
    const agora = new Date();

    let anos = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth() - inicio.getMonth();
    let dias = agora.getDate() - inicio.getDate();
    let horas = agora.getHours() - inicio.getHours();
    let minutos = agora.getMinutes() - inicio.getMinutes();
    let segundos = agora.getSeconds() - inicio.getSeconds();

    if (segundos < 0) { segundos += 60; minutos -= 1; }
    if (minutos < 0) { minutos += 60; horas -= 1; }
    if (horas < 0) { horas += 24; dias -= 1; }
    if (dias < 0) {
      const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += ultimoDiaDoMesAnterior;
      meses -= 1;
    }
    if (meses < 0) { meses += 12; anos -= 1; }

    campos.anos.textContent = anos;
    campos.meses.textContent = meses;
    campos.dias.textContent = dias;
    campos.horas.textContent = doisDigitos(horas);
    campos.minutos.textContent = doisDigitos(minutos);
    campos.segundos.textContent = doisDigitos(segundos);
  }

  atualizarContador();
  setInterval(atualizarContador, 1000);
});
