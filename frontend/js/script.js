//verificação de token
const validaToken = localStorage.getItem("token");
if (!validaToken) {
  window.location.href = "login.html";
}

async function buscarChamados() {
  const token = localStorage.getItem("token");
  const resposta = await fetch("http://localhost:3000/chamados", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dados = await resposta.json();
  console.log(dados);

  const arrayChamados = dados.map((chamado) => {
    const cardHtml = `<li class="chamado-item">
  <div class="card-header">
    <span class="num-ticket">#${chamado.id}</span>
    <span class="prior-ticket">${chamado.prioridade}</span>
  </div>
  <div class="chamado-conteudo">
    <h3>${chamado.titulo}</h3>
  </div>
  <div class="chamado-footer"></div>
</li>`;
    return cardHtml;
  });
  const chamados = document.querySelector(".chamados");
  chamados.innerHTML = arrayChamados.join("");
}

buscarChamados();

//menu toggle
const profileIconBtn = document.querySelector("#profile-icon-btn");
const dropdownList = document.querySelector("#dropdown-list");

profileIconBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownList.classList.toggle("hide");
});

document.addEventListener("click", () => {
  dropdownList.classList.add("hide");
});

//button hamburguer
const hamburguerBtn = document.getElementById("btn-mobile");
const sidebar = document.getElementById("sidebar");
hamburguerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

const userObject = JSON.parse(localStorage.getItem("usuario"));

const userName = document.getElementById("nome-usuario");

if (userObject) {
  userName.textContent = userObject.nome;
  console.log(userObject.nome);
  console.log(userObject.role);
} else {
  console.log("Nenhum usuário encontrado!");
}

const dropConta = document.getElementById("conta-btn");
const dropSair = document.getElementById("sair-btn");

dropSair.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "http://127.0.0.1:5500/frontend/login.html";
});

//new ticket

const novoChamado = document.getElementById("new-ticket-btn");
const overlay = document.querySelector(".overlay");
const formChamado = document.querySelector(".chamado-formulario");
novoChamado.addEventListener("click", () => {
  overlay.classList.toggle("hide");
  formChamado.classList.toggle("hide");
});

const formNTicket = document.querySelector(".chamado-formulario");
formNTicket.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log("Ticket enviado!");
  const tituloNTicket = document.getElementById("titulo").value;
  const descricaoNTicket = document.getElementById("descricao").value;
  const prioridadeNTicket = document.getElementById("prioridade").value;

  if (!tituloNTicket || !descricaoNTicket || !prioridadeNTicket) {
    alert("Ticket não enviado, revise os campos!");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const resposta = await fetch("http://localhost:3000/chamados", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo: tituloNTicket,
        descricao: descricaoNTicket,
        prioridade: prioridadeNTicket,
      }),
    });
    const dados = await resposta.json();

    if (resposta.ok) {
      console.log("Ticket enviado com sucesso!", dados);
      buscarChamados();
      return;
    } else {
      console.log("Ticket não enviado. Verifique os campos!");
      return;
    }
  } catch (erro) {}
});
