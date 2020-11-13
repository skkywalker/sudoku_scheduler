var nomes;
var tabela = [];
var ROWS = 10;

function howManyInLine(nome, linha) {
    var resultado = [];
    for(var coluna = 0; coluna < tabela[linha].length; coluna++) {
        if(nome == tabela[linha][coluna]) {
            resultado.push(linha.toString() + "-" + coluna.toString());
        }
    }
    return resultado;
}

function howManyInColumn(nome, column) {
    var resultado = [];
    for(var linha = 0; linha < tabela.length; linha++) {
        if(nome == tabela[linha][column]) {
            resultado.push(linha.toString() + "-" + column.toString());
        }
    }
    return resultado;
}

function createTabela() {
    for(var i = 0; i < ROWS; i++) {
        tabela[i] = [];
        for(var j = 0; j < nomes[0][1].length; j++) {
            tabela[i].push(0);
        }
    }
}

function createFirstRow() {
    var row_element = document.createElement("tr");
    $("#app").append(row_element);
    for(var i = 0; i < nomes[0][1].length; i++) {
        var element = document.createElement("td");
        row_element.append(element);
        var ul = document.createElement("ul");
        element.append(ul);
        for(var j = 0; j < nomes.length; j++) {
            var li = document.createElement("li");
            var howMany = howManyInColumn(j,i).length;
            li.innerText = (nomes[j][1][i] - howMany) + "\t" + nomes[j][0];
            if(nomes[j][1][i] - howMany == 0) {
                li.style.color = "green";
            } else {
                li.style.color = "red";
            }
            ul.append(li);
        }
    }
}

function createapp() {
    $("#app").empty();
    createFirstRow();
    for(var i = 0; i < ROWS; i++) {
        var row_element = document.createElement("tr");
        $("#app").append(row_element);
        for(var j = 0; j < nomes[0][1].length; j++) {
            var element = document.createElement("td");
            var select = document.createElement("select");
            for(var z = 0; z < nomes.length; z++) {
                select.append(new Option(nomes[z][0], nomes[z][0]));
            }
            element.append(select);
            row_element.append(element);
        }
    }
}

$("#configForm").submit(function(e){
    e.preventDefault();
    nomes = $("#form-nomes").val();
    nomes = nomes.split("\n");
    for(var i = 0; i < nomes.length; i++) {
        nomes[i] = nomes[i].split("-");
        nomes[i][1] = nomes[i][1].split(",");
    }
    createTabela();
    createapp();
});