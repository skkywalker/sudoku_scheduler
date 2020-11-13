var nomes;
var tabela = [];
var ROWS = 6;

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

function checkForDuplicates(line) {
    var linha = tabela[line];
    var duplicates = [];
    for(var i = 0; i < linha.length-1; i++) {
        for(var j = i+1; j < linha.length; j++) {
            if(linha[i] == linha[j]) {
                duplicates.push(line + "-" + i);
                duplicates.push(line + "-" + j);
            }
        }
    }
    var unique = [];
    $.each(duplicates, function(i, el){
        if($.inArray(el, unique) === -1) unique.push(el);
    });
    for(var i = 0; i < unique.length; i++) {
        $("#"+unique[i]).css("background-color", "red");
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

function selected() {
    var id = this.id.split("-");
    var row = id[0];
    var col = id[1];
    tabela[row][col] = this.value;
    createapp();
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
            select.id = i + "-" + j;
            select.onchange = selected;
            for(var z = 0; z < nomes.length; z++) {
                select.append(new Option(nomes[z][0], z));
            }
            select.value = tabela[i][j];
            element.append(select);
            row_element.append(element);
        }
        checkForDuplicates(i);
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