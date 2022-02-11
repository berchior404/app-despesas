class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProxId() {
        let proxId = localStorage.getItem('id')
        return parseInt(proxId) + 1
    }

    gravar(d) {
        let id = this.getProxId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let despesas = Array()

        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }
}

let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value, dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        document.getElementById('tituloModal').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('corpoModal').innerHTML = 'A despesa foi cadastrada com sucesso.'
        document.getElementById('topoModal').className = 'text-success modal-header'
        document.getElementById('botaoModal').className = 'btn-success btn'
        document.getElementById('botaoModal').innerHTML = 'Voltar'

        bd.gravar(despesa)

        $('#alertaRegistro').modal('show')
    } else {
        document.getElementById('tituloModal').innerHTML = 'Erro na gravação!'
        document.getElementById('corpoModal').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.'
        document.getElementById('topoModal').className = 'text-danger modal-header'
        document.getElementById('botaoModal').className = 'btn-danger btn'
        document.getElementById('botaoModal').innerHTML = 'Voltar e corrigir'

        $('#alertaRegistro').modal('show')
    }
}

function carregaListaDespesas() {
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    console.log(despesas)
}