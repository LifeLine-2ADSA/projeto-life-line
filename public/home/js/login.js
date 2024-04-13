function autenticar() {
  let emailVar = email_input.value;
  let senhaVar = senha_input.value;

  if (emailVar == "" || senhaVar == "") {
    alert("Campos vazios! Preencha!")
    return false;
  } else {
    setInterval(500)
    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        console.log("ESTOU NO THEN DO autenticar()!");
  
        if (resposta.ok) {
          console.log(resposta);
  
          resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.idUsuario;
  
            setTimeout(function () {
              window.location.ref = "perfil.html";
            }, 1000); // apenas para exibir o loading
          });
        } else {
          console.log("Houve um erro ao tentar realizar o login!");
  
          resposta.text().then((texto) => {
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });
  }

  

  return false;
}


