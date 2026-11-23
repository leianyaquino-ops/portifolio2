const SUPABASE_URL = "https://fnhuzusppzcolcnpabor.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_PG9Dpirzhx35hvKTyMf9yw_WkzsKj7a";

async function logar(event) {
    if (event) event.preventDefault();

    const loginDigitado = document.getElementById("login").value.trim();
    const senhaDigitada = document.getElementById("senha").value;

    if (!loginDigitado || !senhaDigitada) {
        alert("Preencha o login e a senha!");
        return false;
    }

    try {
        const urlConsulta = `${SUPABASE_URL}/rest/v1/usuarios?login=eq.${encodeURIComponent(loginDigitado)}&senha=eq.${encodeURIComponent(senhaDigitada)}&select=*`;

        const resposta = await fetch(urlConsulta, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!resposta.ok) {
            const erroDados = await resposta.json();
            alert("Erro ao consultar: " + (erroDados.message || resposta.statusText));
            return false;
        }

        const usuarios = await resposta.json();

        if (!usuarios || usuarios.length === 0) {
            alert("Login ou senha incorretos.");
            return false;
        }

        alert("Login realizado com sucesso!");
        window.location.href = "index2.html";

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Não foi possível conectar ao Supabase: " + erro.message);
    }
    return false;
}