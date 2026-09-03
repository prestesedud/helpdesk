const loginForm = document.querySelector(".login-form");
const cadastroForm = document.querySelector(".cadastro-form");
const cadastrarBtn = document.querySelector(".btn-cadastrar");
const btnLogin = document.querySelector(".btn-login");

cadastrarBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  loginForm.classList.add("hide");
  cadastroForm.classList.remove("hide");
});

btnLogin.addEventListener("click", (e) => {
  e.stopPropagation();
  cadastroForm.classList.add("hide");
  loginForm.classList.remove("hide");
});
