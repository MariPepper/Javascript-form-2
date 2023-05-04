/* Para redimensionar a janela sem alterar o que está dentro das divs. */
var x;

function janela() {
    var i;
    var coluna = document.getElementsByClassName('coluna');
    var coluna2 = document.getElementsByClassName('coluna-2')[0];
    x = document.body.clientWidth;

    for (i = 0; i < coluna.length; i++) {
        if (x <= 620) {
            coluna[i].style = 'clear:both;width:100%';
            coluna2.style.width = '100%';
        } else {
            coluna[i].style = 'float:left;width:45%';
            coluna2.style.width = '45%';
        }
    }
}

/* Para guardar na memória toda a informação inserida. */
function copiarInfo() {
    var juro = calcularJuro();
    var qt = calcularQt();
    var desconto = calcularDesconto();
    var nivel = nivelQt();

    localStorage.setItem("juro", juro);
    localStorage.setItem("quantiaTotal", qt[0]);
    localStorage.setItem("quantiaMensal", qt[1]);
    localStorage.setItem("quantiaDeduzida", desconto);
    localStorage.setItem("qtNivel", nivel);
}

/* Para calcular o juro ao ano. */
function calcularJuro() {
    var valor = document.querySelector('input[id="a"]:checked') ? '1500€' :
        document.querySelector('input[id="b"]:checked') ? '2000€' : '';
    localStorage.setItem("valor", valor);
    var taxa = document.getElementById("juro").value;
    var juro = 0;
    if (valor === "1500€") {
        juro = 1500 * (1 + parseFloat(taxa) / 100) ** 12;
    } else if (valor === "2000€") {
        juro = 2000 * (1 + parseFloat(taxa) / 100) ** 12;
    }

    return juro;
}

/* Para calcular o valor mensal e total em anos. 
O empréstimo é feito ao ano. */
function calcularQt() {
    var anos = document.getElementById("anos").value;
    var juro = calcularJuro();
    var quantiaTotal = parseFloat(juro) * anos; // Não retirar.
    var quantiaMensal = quantiaTotal / (anos * 12);

    return [quantiaTotal, quantiaMensal];
}

/* Para calcular o valor do rendimento e capital menos os juros pagos. */
function calcularDesconto() {
    var rendimento = document.getElementById("rendimento").value;
    var rm3 = parseFloat(document.getElementById("rm3").value);
    var c3 = parseFloat(document.getElementById("c3").value);
    var quantiaMensal = calcularQt()[1];
    var quantiaDeduzida = 0;

    if (rendimento === "rm1" && rm3 < 700) {
        if(c3 >= 0){
            quantiaDeduzida = (rm3 + c3) - quantiaMensal;
        } else {
            window.alert("Escolha a opção certa.");
            return false; //return false vai retornar sempre NaN em vez de 0.            
        }
    } else if (rendimento === "rm2" && rm3 > 700) {
        if(c3 >= 0){
            quantiaDeduzida = (rm3 + c3) - quantiaMensal;
        } else {
            window.alert("Escolha a opção certa.");
            return false; //return false vai retornar sempre NaN em vez de 0.
        }
    } else {
        window.alert("Escolha a opção certa.");
        return false; //return false vai retornar sempre NaN em vez de 0.
    }

    return quantiaDeduzida.toFixed(2);
}

/* Para calcular os níveis do juro. */
function nivelQt() {
    var quantiaDeduzida = calcularDesconto();

    if (quantiaDeduzida > 114) { //15% do valor do salário mínimo de 760 euros em 2023.
        return "Higher";
    } else if (quantiaDeduzida > 38) { //5% do valor do salário mínimo de 760 euros em 2023.
        return "Medium";
    } else {
        return "Lower";
    }
}

/* Para exibir a informação armazenada em memória. */
function mostrarInfo() {
    var outputDiv = document.getElementById("outputDiv");

    outputDiv.innerHTML = "Juros: " + parseFloat(localStorage.getItem("juro")).toFixed(2) + "<br>" +
        "Quantia Total em Anos: " + parseFloat(localStorage.getItem("quantiaTotal")).toFixed(2) + "<br>" +
        "Quantia Mensal: " + parseFloat(localStorage.getItem("quantiaMensal")).toFixed(2) + "<br>" +
        "Quantia Deduzida: " + parseFloat(localStorage.getItem("quantiaDeduzida")).toFixed(2) + "<br>" +
        "Nível: " + localStorage.getItem("qtNivel");
}