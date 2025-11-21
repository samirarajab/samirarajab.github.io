// message.js
document.addEventListener("DOMContentLoaded", () => {
  const scheduleOpen = false; // controle central: false = agenda fechada, true = agenda aberta

  const popup = document.getElementById("agendaPopup");
  const openBtn = document.getElementById("btn-agendamento");

  // Se não encontrou algum dos elementos, não faz nada
  if (!popup || !openBtn) return;

  const closeBtn = popup.querySelector(".close");

  // Funções auxiliares
  const openPopup = () => {
    popup.style.display = "flex";       // segue o padrão da calculadora
  };

  const closePopup = () => {
    popup.style.display = "none";
  };

  if (!scheduleOpen) {
    // Visualmente "desativado"
    openBtn.classList.add("disabled");

    // Intercepta clique no botão de agendamento
    openBtn.addEventListener("click", (event) => {
      event.preventDefault(); // impede a navegação para o Google Calendar
      openPopup();
    });

    // Fecha no X
    if (closeBtn) {
      closeBtn.addEventListener("click", closePopup);
    }

    // Fecha ao clicar fora do conteúdo
    window.addEventListener("click", (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });
  }
  // Se scheduleOpen === true, não altera o comportamento: o botão abre o href normalmente
});
