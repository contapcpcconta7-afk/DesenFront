const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");

    const menuAberto = mainNav.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", menuAberto);

    menuToggle.setAttribute(
      "aria-label",
      menuAberto ? "Fechar menu" : "Abrir menu",
    );

    menuToggle.textContent = menuAberto ? "✕" : "☰";
  });
}

// =========================
// FORMULÁRIO
// =========================

const formulario = document.getElementById("formCadastro");

if (formulario) {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const area = document.getElementById("area");

  // Cria a notificação
  const notificacao = document.createElement("div");

  notificacao.id = "formNotification";
  notificacao.setAttribute("role", "alert");

  formulario.insertBefore(notificacao, formulario.firstChild);

  // =========================
  // MÁSCARA DO TELEFONE
  // =========================

  telefone.addEventListener("input", function () {
    let valor = telefone.value.replace(/\D/g, "");

    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    if (valor.length <= 10) {
      valor = valor.replace(/^(\d{2})(\d{0,4})(\d{0,4})$/, "($1) $2-$3");
    } else {
      valor = valor.replace(/^(\d{2})(\d{0,5})(\d{0,4})$/, "($1) $2-$3");
    }

    telefone.value = valor;
  });

  // =========================
  // ENVIO DO FORMULÁRIO
  // =========================

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    // Remove erros anteriores
    nome.classList.remove("input-error");
    email.classList.remove("input-error");
    telefone.classList.remove("input-error");
    area.classList.remove("input-error");

    let formularioValido = true;

    // =========================
    // NOME
    // =========================

    if (nome.value.trim().length < 3) {
      nome.classList.add("input-error");
      formularioValido = false;
    }

    // =========================
    // E-MAIL
    // =========================

    if (!email.validity.valid) {
      email.classList.add("input-error");
      formularioValido = false;
    }

    // =========================
    // TELEFONE
    // =========================

    const numeroTelefone = telefone.value.replace(/\D/g, "");

    if (numeroTelefone.length !== 10 && numeroTelefone.length !== 11) {
      telefone.classList.add("input-error");
      formularioValido = false;
    }

    // =========================
    // ÁREA
    // =========================

    if (area.value === "") {
      area.classList.add("input-error");
      formularioValido = false;
    }

    // =========================
    // RESULTADO
    // =========================

    if (!formularioValido) {
      notificacao.textContent =
        "Não foi possível realizar o cadastro. Verifique os campos destacados.";

      notificacao.className = "form-notification error";

      return;
    }

    notificacao.textContent =
      "Cadastro realizado com sucesso, " +
      nome.value.trim() +
      "! Obrigado por fazer parte do Mundo Mais Verde.";

    notificacao.className = "form-notification success";

    formulario.reset();
  });
}
console.log("SCRIPT FUNCIONANDO");
