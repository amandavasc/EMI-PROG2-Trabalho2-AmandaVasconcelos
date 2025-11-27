class Quarto {
    constructor(numero, tipo, preco) {
        this.numero = numero;
        this.tipo = tipo;
        this.preco = preco;
    }

    exibirDados() {
        return `Quarto ${this.numero} - Tipo: ${this.tipo} - Diária: R$${this.preco} `;
    }

    toString() {
        return this.exibirDados();
    }
}

class Reserva {
    constructor(quarto, hospede, checkin, checkout) {
        this.quarto = quarto
        this.hospede = hospede;
        this.checkin = checkin;
        this.checkout = checkout;
    }

    exibirDados() {
        return `Reserva - Hóspede: ${this.hospede} - ${this.checkin} até ${this.checkout}
Quarto: ${this.quarto.exibirDados()}`;
    }

    toString() {
        return this.exibirDados();
    }
}

