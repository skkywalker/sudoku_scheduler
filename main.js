var nomes;
var ROWS = 10;

function createapp() {
    $("#app").empty();
    for(var i = 0; i < ROWS; i++) {
        var row_element = document.createElement("tr");
        $("#app").append(row_element);
        for(var j = 0; j < nomes[0][1].length; j++) {
            var element = document.createElement("td");
            var select = document.createElement("select");
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
    createapp();
});