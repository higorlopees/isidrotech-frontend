function efetuarLogin() {
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;

    var msgBody = {
        racf: txtLogin,
        email: txtLogin,
        senha: txtSenha
    };

    var request = {
        method: "POST",
        body: JSON.stringify(msgBody),
        headers: {
            "Content-type": "application/json"
        }
    };

    fetch("http://localhost:8088/login", request)
        .then(res => trataResposta(res));
}

function trataResposta(res) {
    if (res.status == 200) {
        res.json().then(objUsuario => logarUsuario(objUsuario));
    } else if (res.status == 401) {
        document.getElementById("msg").innerHTML = `<p class="msgErro">Senha incorreta</p>`;
    } else if (res.status == 404) {
        document.getElementById("msg").innerHTML = `<p class="msgErro">Usuário inválido ou inexistente</P>`;
    } else {
        document.getElementById("msg").innerHTML = `<p class="msgErro">Erro desconhecido - Erro: ${res.status}</p>`;
    }
}

function logarUsuario(objUsuario) {
    localStorage.setItem("userAlarme", JSON.stringify(objUsuario));
    window.location = "selecao.html";
}

function validaSeUsuarioEstaLogado() {
    var objUser = localStorage.getItem("userAlarme");

    if (objUser) {
        window.location = "selecao.html";
    }
}