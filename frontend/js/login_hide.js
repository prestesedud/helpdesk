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

const formularioLogin = document.querySelector(".login-form");

formularioLogin.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log("Formulário enviado!");

  const emailLogin = document.getElementById("email_login").value.trim();
  const senhaLogin = document.getElementById("passwd_login").value;

  if (!emailLogin || !senhaLogin) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  if (senhaLogin.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: emailLogin,
        senha: senhaLogin,
      }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      console.log("Login bem sucedido: ", dados);
      if (dados.token) {
        localStorage.setItem("token", dados.token);
      }
      if (dados.nome && dados.role) {
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            nome: dados.nome,
            role: dados.role,
          }),
        );
      }
      formularioLogin.reset();
      window.location.href = "index.html";
    } else {
      alert(`Erro no login: ${dados.message || "credenciais inválidas"}`);
    }
  } catch (erro) {
    console.error("Erro na requisição: ", erro);
    alert("Erro na conexão. Tente novamente mais tarde.");
  }

  //cadastro
});

const formularioCadastro = document.querySelector(".cadastro-form");
formularioCadastro.addEventListener("submit", async function (event) {
  event.preventDefault();

  console.log("formulário enviado!");

  const nome = document.getElementById("nome").value.trim();
  const emailCadastro = document.getElementById("email_cadastro").value.trim();
  const senhaCadastro = document.getElementById("passwd_cadastro").value;
  const confirmacaoSenha = document.getElementById("passwd_confirm").value;

  if (!nome || !emailCadastro || !senhaCadastro || !confirmacaoSenha) {
    alert("Existem valores não inseridos!");
    return;
  }

  if (senhaCadastro.length < 6) {
    alert("Senha muito curta!");
    return;
  }

  if (confirmacaoSenha !== senhaCadastro) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/auth/cadastro", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nome: nome,
        email: emailCadastro,
        senha: senhaCadastro,
      }),
    });
    const dados = await resposta.json();

    if (resposta.ok) {
      console.log("Usuário registrado com sucesso!", dados);
      return;
    } else {
      alert(`Erro no cadastro: ${dados.message || "Cadastro não efetuado!"}`);
    }
  } catch (erro) {
    console.error("Erro na requisição: ", erro);
    alert("Erro na conexão. Tente novamente mais tarde.");
  }
});
