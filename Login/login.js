document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o evento de submit ao formulário de login
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        // Obtém os valores dos campos de login e senha
        var login = document.getElementById('login').value;
        var senha = document.getElementById('senha').value;

        // Verifica as credenciais do usuário
        var usuarioValido = validarLogin(login, senha);

        if (usuarioValido) {
            // Armazena os dados do usuário corrente no sessionStorage
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioValido));
            alert('Login realizado com sucesso!');
            window.location.href = '../perfil/src/perfil.html'; // Redireciona para a página de perfil
        } else {
            alert('Login ou senha inválidos!');
        }
    });
});document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o evento de submit ao formulário de login
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        // Obtém os valores dos campos de login e senha
        var login = document.getElementById('login').value;
        var senha = document.getElementById('senha').value;

        // Verifica as credenciais do usuário
        var usuarioValido = validarLogin(login, senha);

        if (usuarioValido) {
            // Armazena os dados do usuário corrente no sessionStorage
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioValido));
            alert('Login realizado com sucesso!');
            window.location.href = '../perfil/src/perfil.html'; // Redireciona para a página de perfil
        } else {
            alert('Login ou senha inválidos!');
        }
    });
});

// Função para validar as credenciais de login
function validarLogin(login, senha) {
    // Obtém o banco de dados de usuários do localStorage
    var db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));

    if (db_usuarios && db_usuarios.usuarios) {
        var usuarios = db_usuarios.usuarios;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].login === login && usuarios[i].senha === senha) {
                return usuarios[i]; // Retorna o usuário válido
            }
        }
    }

    return null; // Retorna null se o login falhar
}


// Função para validar as credenciais de login
function validarLogin(login, senha) {
    // Obtém o banco de dados de usuários do localStorage
    var db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));

    if (db_usuarios && db_usuarios.usuarios) {
        var usuarios = db_usuarios.usuarios;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].login === login && usuarios[i].senha === senha) {
                return usuarios[i]; // Retorna o usuário válido
            }
        }
    }

    return null; // Retorna null se o login falhar
}