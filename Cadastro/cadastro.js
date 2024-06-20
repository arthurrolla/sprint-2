// Função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); // Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; // Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) { // Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { // Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
  var acertos = 0;

// Dados iniciais de usuários
const dadosIniciais = {
    usuarios: [
        { "id": generateUUID(), "login": "admin", "senha": "123", "nome": "Administrador do Sistema", "email": "admin@abc.com", "acertos": acertos, "metas": 0 },
        { "id": generateUUID(), "login": "user", "senha": "123", "nome": "Usuario Comum", "email": "user@abc.com", "acertos": acertos, "metas": 0 }
    ]
};

// Inicializa o banco de dados de usuários
var db_usuarios = JSON.parse(localStorage.getItem('db_usuarios')) || dadosIniciais;
var usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente')) || {};

// Função para salvar um novo usuário
function salvarCadastro() {
    // Captura os valores dos campos do formulário
    var login = document.getElementById('txt_login').value;
    var nome = document.getElementById('txt_nome').value;
    var email = document.getElementById('txt_email').value;
    var senha = document.getElementById('txt_senha').value;
    var senha2 = document.getElementById('txt_senha2').value;


    // Verifica se a senha e a confirmação de senha são iguais
    if (senha !== senha2) {
        alert('As senhas não coincidem.');
        return;
    }

    // Verifica se todos os campos estão preenchidos
    if (!login || !nome || !email || !senha || !senha2) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Adiciona o novo usuário ao banco de dados
    addUser(nome, login, senha, email, acertos);

    // Limpa o formulário
    document.getElementById('login-form').reset();

    // Fecha o modal
    $('#loginModal').modal('hide');

    alert('Usuário cadastrado com sucesso!');
}

// Função para adicionar usuário
function addUser(nome, login, senha, email, acertos) {
    let newId = generateUUID();
    let usuario = { "id": newId, "login": login, "senha": senha, "nome": nome, "email": email, "acertos": acertos, "metas": 0};
    db_usuarios.usuarios.push(usuario);
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
    
}

// Inicializa a aplicação
function initApp() {
    // Carrega o banco de dados de usuários a partir do localStorage
    var usuariosJSON = localStorage.getItem('db_usuarios');
    if (!usuariosJSON) {
        db_usuarios = dadosIniciais;
        localStorage.setItem('db_usuarios', JSON.stringify(dadosIniciais));
    } else {
        db_usuarios = JSON.parse(usuariosJSON);
    }

    // Carrega o usuário corrente a partir do sessionStorage
    var usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }
}

// Inicializa as estruturas utilizadas pelo cadastro
initApp();
