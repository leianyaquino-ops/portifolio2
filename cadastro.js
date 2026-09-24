const SUPABASE_URL = 'https://fnhuzusppzcolcnpabor.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLIC_AQUI'; // Insira aqui a sua chave anon public do Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const cadastroForm = document.querySelector('form');

if (cadastroForm) {
  cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento automático da página

    const emailInput = cadastroForm.querySelector('input[type="email"]') || document.getElementById('email');
    const passwordInput = cadastroForm.querySelector('input[type="password"]') || document.getElementById('password');

    if (!emailInput || !passwordInput) {
      alert('Campos de e-mail ou palavra-passe não encontrados.');
      return;
    }

    const { data, error } = await _supabase.auth.signUp({
      email: emailInput.value.trim(),
      password: passwordInput.value,
    });

    if (error) {
      alert('Erro ao cadastrar: ' + error.message);
    } else {
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'index.html';
    }
  });
}