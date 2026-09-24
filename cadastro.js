// Inicialização do Supabase
const SUPABASE_URL = 'https://fnhuzusppzcolcnpabor.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLIC_AQUI'; // Subsitua pela sua chave anon public do Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const cadastroForm = document.getElementById('cadastroForm');

if (cadastroForm) {
  cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const { data, error } = await _supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        alert('Erro ao cadastrar: ' + error.message);
      } else {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
      }
    } catch (err) {
      alert('Ocorreu um erro inesperado: ' + err.message);
    }
  });
}