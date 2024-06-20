document.addEventListener('DOMContentLoaded', function() {
    // Obtém os dados do usuário corrente do sessionStorage
    var usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));

    if (usuarioCorrente) {
        // Preenche o formulário com os dados do usuário
        document.getElementById('nome').value = usuarioCorrente.nome;
        document.getElementById('login').value = usuarioCorrente.login;
        document.getElementById('e-mail').value = usuarioCorrente.email;

        // Carrega a imagem do perfil, se houver
        if (usuarioCorrente.profileImg) {
            document.getElementById('profile-img').src = usuarioCorrente.profileImg;
        }
    } else {
        alert('Nenhum usuário logado!');
        window.location.href = '../login/index.html'; // Redireciona para a página de login se não houver usuário logado
    }

    // Adiciona o evento de submit ao formulário de perfil
    document.getElementById('perfil-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        // Obtém os valores dos campos do formulário
        var nome = document.getElementById('nome').value;
        var login = document.getElementById('login').value;
        var email = document.getElementById('e-mail').value;
        var senha = document.getElementById('senha').value;
        var senha2 = document.getElementById('senha2').value;

        // Verifica se a senha e a confirmação de senha são iguais, se fornecidas
        if (senha && senha !== senha2) {
            alert('As senhas não coincidem.');
            return;
        }

        // Atualiza os dados do usuário corrente
        usuarioCorrente.nome = nome;
        usuarioCorrente.login = login;
        usuarioCorrente.email = email;
        if (senha) {
            usuarioCorrente.senha = senha;
        }

        // Atualiza o banco de dados de usuários no localStorage
        var db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));
        for (var i = 0; i < db_usuarios.usuarios.length; i++) {
            if (db_usuarios.usuarios[i].id === usuarioCorrente.id) {
                db_usuarios.usuarios[i] = usuarioCorrente;
                break;
            }
        }
        localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));

        // Atualiza os dados do usuário corrente no sessionStorage
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));

        alert('Perfil atualizado com sucesso!');
    });

    // Adiciona evento para o botão de upload de imagem
    document.getElementById('upload-btn').addEventListener('click', function() {
        document.getElementById('profile-img-input').click();
    });

    // Adiciona evento para o input de imagem
    document.getElementById('profile-img-input').addEventListener('change', function(event) {
        var reader = new FileReader();
        reader.onload = function() {
            var profileImg = reader.result;
            document.getElementById('profile-img').src = profileImg;
            usuarioCorrente.profileImg = profileImg;
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
        };
        reader.readAsDataURL(event.target.files[0]);
    });
});



