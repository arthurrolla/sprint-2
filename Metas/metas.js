// Adiciona um evento de escuta ao botão "Salvar Alterações"
document.querySelector('.save-button').addEventListener('click', function () {
    // Acessa o localStorage para obter os dados do usuário
    var usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    var db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));
    // Captura o valor do radio button selecionado
    var metaSelecionada = document.querySelector('input[name="goal"]:checked');

    if (metaSelecionada) {
        // Atualiza a variável metas do usuário com base no id selecionado
        usuarioCorrente.metas = metaSelecionada.id;
        for (var i = 0; i < db_usuarios.usuarios.length; i++) {
            if (db_usuarios.usuarios[i].id === usuarioCorrente.id) {
                db_usuarios.usuarios[i] = usuarioCorrente;
                break;
            }
        }
        localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
        // Armazena os dados atualizados do usuário no sessionStorage
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));

        // Atualiza os dados no localStorage também
        //localStorage.setItem('db_usuarios', JSON.stringify(usuarioCorrente));
        alert('Meta atualizada com sucesso!');
    } else {
        alert('Por favor, selecione uma meta.');
    }
});


