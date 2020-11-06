function carregaInformacoesUsuario() {
    var objUser = JSON.parse(localStorage.getItem("userAlarme"));

    if (!objUser) {
        window.location = "index.html";
    }

    document.getElementById("fotoUser").innerHTML = `<img src="${objUser.linkFoto}" width="100px" style="border-radius: 50%;" "></img>`;
    document.getElementById("infoUser").innerHTML = `<strong> Nome : </strong> ${objUser.nome} <br>
                                                     <strong> Email: </strong> ${objUser.email} <br>
                                                     <strong> RACF : </strong> ${objUser .racf} <br>`;
}

function logout() {
    localStorage.removeItem("userAlarme");
    window.location = "index.html";
}