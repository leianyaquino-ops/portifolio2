const SUPABASE_URL = "https://supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_PG9Dpirzhx35hvKTyMf9yw_WkzsKj7a"; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function logar(event) {
    if (event) event.preventDefault();

    const loginDigitado = document.getElementById("login").value.trim();
    const senhaDigitada = document.getElementById("senha").value;

    if (!loginDigitado || !senhaDigitada) {
        alert("Preencha o login e a senha!");
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from("usuarios")
            .select("*")
            .eq("login", loginDigitado)
            .eq("senha", senhaDigitada)
            .single();

        if (error || !data) {
            alert("Login ou senha incorretos.");
            return;
        }

        alert("Login realizado com sucesso!");
        window.location.href = "index2.html";

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Não foi possível conectar ao Supabase.");
    }
}
