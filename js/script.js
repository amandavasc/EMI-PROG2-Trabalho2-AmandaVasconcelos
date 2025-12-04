let quartos = [];
let reservas = [];

function carregarDados() {
    let q = localStorage.getItem("quartos");
    let r = localStorage.getItem("reservas");

    if (q) {
        let lista = JSON.parse(q);
        quartos = lista.map(item => new Quarto(item.numero, item.tipo, item.preco));
    }

    if (r) {
        let lista = JSON.parse(r);
        reservas = lista.map(item => {
            let quartoObj = new Quarto(item.quarto.numero, item.quarto.tipo, item.quarto.preco);
            return new Reserva(quartoObj, item.hospede, item.checkin, item.checkout);
        });
    }

    atualizarListas();
    atualizarSelectQuartos();
}

function salvarDados() {
    localStorage.setItem("quartos", JSON.stringify(quartos));
    localStorage.setItem("reservas", JSON.stringify(reservas));
}

// mostra listas
function atualizarListas() {
    let listaQ = document.getElementById("areaListaQuartos");
    let listaR = document.getElementById("areaListaReservas");

    listaQ.innerHTML = "";
    listaR.innerHTML = "";

    quartos.forEach((q, i) => {
        let p = document.createElement("p");
        p.textContent = q.toString();

        let btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.addEventListener("click", () => removerQuarto(i));

        p.appendChild(btn);
        listaQ.appendChild(p);
    });

    reservas.forEach((r, i) => {
        let p = document.createElement("p");
        p.textContent = r.toString();

        let btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.addEventListener("click", () => removerReserva(i));

        p.appendChild(btn);
        listaR.appendChild(p);
    });
}

function removerQuarto(i) {
    quartos.splice(i, 1);
    salvarDados();
    atualizarListas();
    atualizarSelectQuartos();
}

function removerReserva(i){

    reservas.splice(i, 1);
    salvarDados();
    atualizarListas();
}


// atualiza select
function atualizarSelectQuartos(){
        let select = document.getElementById("reservaSelectQuarto");
        select.innerHTML = "";
        quartos.forEach(q => {
            const option = document.createElement("option");
            option.value = q.numero;
            option.textContent = q.toString();
            select.appendChild(option);
        });
    }
    
    

// cadastro do quarto
document.getElementById("formQuarto").addEventListener("submit", function(cadastroQuarto) {
    cadastroQuarto.preventDefault();

    let numero = document.getElementById("quartoNome").value;
    let tipo = document.getElementById("quartoTipo").value;
    let preco = document.getElementById("quartoPreco").value;

    let quarto = new Quarto(numero, tipo, preco);
    quartos.push(quarto);

    salvarDados();
    atualizarListas();
    atualizarSelectQuartos();
});



// cadastro da reserva
document.getElementById("formReserva").addEventListener("submit", function(cadastroReserva){
    cadastroReserva.preventDefault();

    let numeroQuarto = document.getElementById("reservaSelectQuarto").value;
    let hospede = document.getElementById("reservaHospede").value;
    let checkin = document.getElementById("reservaCheckin").value;
    let checkout = document.getElementById("reservaCheckout").value;

    let quartoEncontrado = quartos.find(q => q.numero == numeroQuarto);

    let reserva = new Reserva(quartoEncontrado, hospede, checkin, checkout);
    reservas.push(reserva);

    salvarDados();
    atualizarListas();

});

carregarDados();
