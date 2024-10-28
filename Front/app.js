document.addEventListener("DOMContentLoaded", function () {
  //Chamada da função cadastrar_usuario para a associação ao evento de envio do formulário

  function cadastrar_usuario(event) {
    //previne o comportamento padrão do formulário, ou seja, impede que ele saja enviado e recarregue a página
    event.preventDefault();
    //Captura os valores dos compos de formulario
    const nome_usuario = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const check_senha = document.getElementById("check_senha").value;

    //Requisção HTTP para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/Agenda-Senai/api/v1/usuario_cadastro/", {
      //Realiza uma chamada HTTP para o servidor (a rota definida)
      method: "POST",
      headers: {
        //A requisição será em formato json
        "Content-Type": "application/json",
      },
      //Transforma os dados do formulário em uma string json para serem emviados no corpo da requisição
      body: JSON.stringify({ nome_usuario, senha, email, check_senha }),
    })
      .then((response) => {
        //Tratamento da resposta do servidor / API
        if (response.ok) {
          //Verifica se a resposta foi bem sucedida(status 2xx)
          return response.json();
        }
        //Convertendo o erro em formato json
        return response.json().then((err) => {
          //Mensagem retonada do servidor,acessada pela chave "error"
          throw new Error(err.error);
        });
      }) //fechamento da then(response)
      .then((data) => {
        //Executa a resposta de sucesso -retorna ao usuário final
        //Exibe um alerta para o usuário final(front) com o nome do usuário que acabou de ser cadastrado
        //alert("Usuário cadastrado com sucesso! " + data.user.name);
        alert(data.message);
        console.log(data.message);

        //Reseta os campos do formulário após osucesso do trabalho
        document.getElementById("formulario-cadastro").reset();
      })
      .catch((error) => {
        //Captura qualquer erro que ocorra durente o processo da requisição /resposta
        alert("Erro no cadastro:" + error.message);
        console.error("Erro:", error.message);
      });
  }

  document
    .getElementById("formulario-cadastro")
    .addEventListener("submit", cadastrar_usuario);
});

document.addEventListener("DOMContentLoaded", function () {
  function login_usuario(event) {
    //previne o comportamento padrão do formulário, ou seja, impede que ele saja enviado e recarregue a página
    event.preventDefault();
    //Captura os valores dos compos de formulario
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    //Requisção HTTP para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/Agenda-Senai/api/v1/usuario_login/", {
      //Realiza uma chamada HTTP para o servidor (a rota definida)
      method: "POST",
      headers: {
        //A requisição será em formato json
        "Content-Type": "application/json",
      },
      //Transforma os dados do formulário em uma string json para serem emviados no corpo da requisição
      body: JSON.stringify({ email, senha }),
    })
      .then((response) => {
        //Tratamento da resposta do servidor / API
        if (response.ok) {
          //Verifica se a resposta foi bem sucedida(status 2xx)
          return response.json();
        }
        //Convertendo o erro em formato json
        return response.json().then((err) => {
          //Mensagem retonada do servidor,acessada pela chave "error"
          throw new Error(err.error);
        });
      }) //fechamento da then(response)
      .then((data) => {
        //Executa a resposta de sucesso -retorna ao usuário final

        window.location.href = "inicial.html";
      })
      .catch((error) => {
        //Captura qualquer erro que ocorra durente o processo da requisição /resposta
        alert("Erro no login:" + error.message);
        console.error("Erro:", error.message);
      });
  }

  document
    .getElementById("formulario-login")
    .addEventListener("submit", login_usuario);
});
