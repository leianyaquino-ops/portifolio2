function cadastrar() {

    const login = document.getElementById('novoLogin').value;
    const senha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
        alert('As senhas não são iguais!');
        return;
    }

    // Envia os dados para o Node
    fetch('http://localhost:3000/api/cadastro', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            login: login,
            senha: senha,
            tipoUsuario: tipoUsuario
        })
    })

    .then(response => response.json())

    .then(data => {

        if (data.sucesso) {

            alert(data.mensagem);

            // Depois do cadastro, vai para a tela de login
            window.location.href = 'login.html';

        } else {

            alert(data.mensagem);
        }
    })

    .catch(error => {

        console.error('Erro:', error);

        alert('Não foi possível conectar ao servidor.');
    });
}
