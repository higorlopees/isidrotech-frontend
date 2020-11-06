function gerarRelatorio() {
    var txtDataInicio = document.getElementById("txtDataInicio").value;
    var txtDataFim = document.getElementById("txtDataFim").value;

    if (txtDataFim == null || txtDataInicio == null || txtDataFim == undefined || txtDataInicio == undefined || txtDataInicio == "" || txtDataFim == "") {
        document.getElementById("relatorio").innerHTML = `<p class="datasInvalidas">Período inválido! É necessário selecionar uma data de ínicio e uma data de fim!</p>`;
    } else {
        var msgBody = {
            dataInicio: txtDataInicio,
            dataFim: txtDataFim
        };

        var request = {
            method: "POST",
            body: JSON.stringify(msgBody),
            headers: {
                "Content-type": "application/json"
            }
        };

        fetch("http://localhost:8088/eventos/consolidado/intervalo", request)
            .then(res => res.json()
                .then(lista => preencheRelatorio(lista)));
    }
}

function preencheRelatorio(lista) {
    var txtRelatorio = `<strong>${lista.length}</strong> alarmes(s) encontrados no período`

    if (lista.length > 0) {
        txtRelatorio += `<div class="table-responsive">
                            <table id="tblRelatorio" class="table table-hover table-striped table-light">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome alarme</th>
                                        <th scope="col">Quantidade</th>
                                        <th scope="col" class="export">
                                            <button type="button" class="btn btn-dark export" onclick="window.print()">Exportar</button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>`;

        lista.forEach(alarme => {
            txtRelatorio += `<tr>
                                <th scope="row">${alarme.nomeAlarme}</th>
                                <td>${alarme.quantidade}</td>
                                <td></td>
                            </tr>`;
        });

        txtRelatorio += `       </tbody>
                            </table>
                        </div>`;
    }

    document.getElementById("relatorio").innerHTML = txtRelatorio;
    $("#tblRelatorio").DataTable({
        searching: false,
        info: false,
        lengthChange: false,
        pageLength: 20
    });
}

function validaSeUsuarioEstaLogado() {
    var objUser = localStorage.getItem("userAlarme");

    if (!objUser) {
        window.location = "index.html";
    }
}

function logout() {
    localStorage.removeItem("userAlarme");
    window.location = "index.html";
}