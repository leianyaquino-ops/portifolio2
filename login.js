async function logar() {
    // Pega os valores digitados
    var loginDigitado = document.getElementById("login").value;
    var senhaDigitada = document.getElementById("senha").value;

    try {
        // Envia os dados para o seu servidor Node.js
        // (Certifique-se de que a porta 3000 é a que seu servidor está rodando)
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: loginDigitado, senha: senhaDigitada })
        });

        // Recebe a resposta do servidor
        const data = await response.json();

        if (data.sucesso) {
            alert(data.mensagem);
            // Redireciona para a página interna
            window.location.href = "home.html"; 
        } else {
            alert(data.mensagem); // "Usuário ou senha incorretos!"
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro ao tentar conectar ao servidor. Verifique se o backend está rodando.");
    }
}