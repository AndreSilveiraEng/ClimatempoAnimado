class Pessoa {
    constructor(nome, idade, rg) {
        this.nome = nome;
        this.idade = idade;
        this.rg = rg;
    }
    getInformations() {
        return `Nome: ${this.nome}<br>Idade: ${this.idade}<br>R.G: ${this.rg}`;
    }
}

class Profissao extends Pessoa {
    constructor(nome, idade, rg, profissao, cargo) {
        super(nome, idade, rg);
        this.profissao = profissao;
        this.cargo = cargo;
    }
    getProfissao() {
        return `Profissão: ${this.profissao}<br>Cargo: ${this.cargo}`;
    }
}

let pessoasPorRG = new Map();

function adicionarPessoa() {
    var nome = document.getElementById("nome").value;
    var idade = document.getElementById("idade").value;
    var rg = document.getElementById("rg").value; 
    var profissao = document.getElementById("profissao").value;
    var cargo = document.getElementById("cargo").value;
    var displayElement = document.getElementById("infoDisplay");
    if (nome.trim() === '' || idade.trim() === '' || rg.trim() === '') {
        displayElement.innerHTML = `Por favor, preencha todos os campos.`;
    } else {
        const novaPessoa = new Profissao(nome, idade, rg, profissao, cargo);
        pessoasPorRG.set(rg, novaPessoa);
        displayElement.innerHTML = `${nome} foi adicionado(a) com sucesso.`;
    }
}

function consultarPessoaPorRG(rg) {
    const pessoa = pessoasPorRG.get(rg);
    if (pessoa) {
        var displayElement = document.getElementById("infoDisplay");
        displayElement.innerHTML = pessoa.getInformations() + `<br> <input style="margin-top: 2%; margin-bottom: 2%;" type="button" id="btnProfissao" value="Obter dados da profissão">`;

        document.getElementById("btnProfissao").addEventListener('click', function() {
            if (pessoa instanceof Profissao) {
                displayElement.innerHTML += `<br>${pessoa.getProfissao()}`;
            } else {
                displayElement.innerHTML += `<br>Informações sobre a profissão não disponíveis.`;
            }
        });
    } else {
        var displayElement = document.getElementById("infoDisplay");
        displayElement.innerHTML = "Pessoa não encontrada!";
    }
}


function mostrarInformacoes() {
    const pessoa1 = new Pessoa(nome, idade, rg);
    var info = pessoa1.getInformations()
    var displayInfo = document.getElementById("resultado");
    displayInfo.innerHTML = `${info}<br> <input type="button" onclick="" value="Profissão">`;
}

function soma(){
    const a = document.getElementById("numeroA").value;
    const b = document.getElementById("numeroB").value;
    return alert(`O resultado da soma é ${parseFloat(a) + parseFloat(b)}`);
}

async function getDados() {
    try {
        var account_id = document.getElementById("account-id").value;
        var access_token = document.getElementById("access-token").value;
        const response = await fetch(`https://graph.facebook.com/v18.0/act_${account_id}?fields=name,ads&access_token=${access_token}`);
        
        // Verificar se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('Falha na requisição: ' + response.statusText);
        }
        
        const dadosFormatados = await response.json();
        alert(JSON.stringify(dadosFormatados, null, 2)); // Exibe os dados formatados no alerta
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar dados: ' + error.message); // Informa o erro
    }
}
