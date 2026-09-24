// =====================================================
// CONFIGURAÇÃO DO SUPABASE
// =====================================================
const SUPABASE_URL = "https://fnhuzusppzcolcnpabor.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaHV6dXNwcHpjb2xjbnBhYm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNzMyNzEsImV4cCI6MjEwNTg0OTI3MX0.vJVvyk2N2486O512Ly7b0JAMtu4XSnMqw2sFA3G7Guw";

// Inicializa a conexão com o Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function logar() {
    const loginDigitado = document.getElementById("login").value;
    const senhaDigitada = document.getElementById("senha").value;

    try {
        // Autentica diretamente na nuvem do Supabase
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: loginDigitado,
            password: senhaDigitada
        });

        if (error) {
            alert("Erro ao conectar: " + error.message);
            return;
        }

        alert("Conectado com sucesso!");
        // Redireciona para a página principal
        window.location.href = "home.html";

    } catch (erro) {
        console.error("Erro na autenticação:", erro);
        alert("Ocorreu um erro ao tentar fazer login.");
    }
}