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

        fetch("http://localhost:8088/eventos/intervalo", request)
            .then(res => res.json()
                .then(lista => preencheRelatorio(lista)));
    }
}

function preencheRelatorio(lista) {
    var txtRelatorio = `<strong>${lista.length}</strong> evento(s) encontrados no período`

    if (lista.length > 0) {
        txtRelatorio += `<div class="table-responsive">
                            <table id="tblRelatorio" class="table table-hover table-striped table-light">
                                <thead>
                                    <tr>
                                        <th scope="col">#NumSeq</th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Hostname</th>
                                        <th scope="col">Endereço IP</th>
                                        <th scope="col">Nome alarme</th>
                                        <th scope="col" class="export">                                        
                                            <button type="button" class="btn btn-dark export" onclick="window.print()">Exportar</button>
                                        </th>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>`;

        lista.forEach(evento => {
            txtRelatorio += `<tr>
                                <th scope="row">${evento.numSeq}</th>
                                <td>${evento.data}</td>
                                <td>${evento.equipamento.hostname}</td>
                                <td>${evento.equipamento.ip}</td>
                                <td>${evento.alarme.nome}</td>
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